// Keep worker code as source so the app bundler cannot inject external helpers.
export const WORKER_SOURCE = `
  const send = globalThis.postMessage.bind(globalThis);

  let completed = false;
  let settling = false;
  const defer = globalThis.setTimeout.bind(globalThis);
  const timers = new Set();
  let pendingFetches = 0;
  const finish = () => {
    if (!completed || timers.size || pendingFetches || settling) return;
    settling = true;
    // ponytail: 50ms idle grace for callback microtasks; await work without timers.
    defer(() => {
      settling = false;
      if (timers.size === 0 && pendingFetches === 0) send({ type: "done" });
    }, 50);
  };
  const format = (value) => {
    if (value instanceof Error) return value.name + ": " + value.message;
    if (typeof value === "string") return value;
    const seen = new WeakSet();
    try {
      return JSON.stringify(value, (_, item) => {
        if (typeof item === "bigint") return String(item) + "n";
        if (item && typeof item === "object") {
          if (seen.has(item)) return "[Circular]";
          seen.add(item);
        }
        return item;
      }, 2) ?? String(value);
    } catch {
      return "[Unable to display value]";
    }
  };
  ["log", "info", "warn", "error", "debug", "table"].forEach((level) => {
    globalThis.console[level] = (...args) => {
      send({ type: "output", level, text: args.map(format).join(" ").slice(0, 8000) });
    };
  });
  const nativeFetch = typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null;
  if (nativeFetch) {
    globalThis.fetch = (...args) => {
      pendingFetches += 1;
      try {
        return nativeFetch(...args).finally(() => {
          pendingFetches -= 1;
          finish();
        });
      } catch (error) {
        pendingFetches -= 1;
        finish();
        throw error;
      }
    };
  }
  // Track browser timers so ordinary setTimeout examples can finish naturally.
  for (const name of ["setTimeout", "setInterval"]) {
    const native = globalThis[name].bind(globalThis);
    globalThis[name] = (callback, delay, ...args) => {
      const id = native(() => {
        if (name === "setTimeout") timers.delete(id);
        try { callback(...args); } catch (error) {
          send({ type: "error", text: format(error) });
        }
        finish();
      }, delay);
      timers.add(id);
      return id;
    };
  }
  for (const name of ["clearTimeout", "clearInterval"]) {
    const native = globalThis[name].bind(globalThis);
    globalThis[name] = (id) => { native(id); timers.delete(id); finish(); };
  }
  globalThis.addEventListener("unhandledrejection", (event) => {
    event.preventDefault();
    send({ type: "error", text: format(event.reason) });
  });
  globalThis.onmessage = async ({ data }) => {
    try {
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      await new AsyncFunction(data)();
      completed = true;
      finish();
    } catch (error) {
      send({ type: "error", text: format(error) });
    }
  };
`;

export function runJavaScript(code, onOutput, onFinish) {
  const frame = document.createElement("iframe");
  frame.hidden = true;
  frame.title = "Isolated JavaScript runner";
  frame.setAttribute("sandbox", "allow-scripts");
  let stopped = false;
  let started = false;
  const stop = () => {
    stopped = true;
    window.removeEventListener("message", receive);
    frame.contentWindow?.postMessage({ type: "stop" }, "*");
    frame.remove();
  };
  const finish = (status, error) => {
    if (stopped) return;
    stop();
    if (error) onOutput({ level: "error", text: error });
    onFinish(status);
  };
  const receive = ({ source, data }) => {
    if (source !== frame.contentWindow || !data || stopped) return;
    if (data.type === "ready" && !started) {
      started = true;
      frame.contentWindow.postMessage({ type: "run", code }, "*");
    } else if (data.type === "output" && typeof data.text === "string") {
      onOutput({ level: ["warn", "error"].includes(data.level) ? data.level : "log", text: data.text.slice(0, 8000) });
    } else if (data.type === "done") {
      finish("Completed");
    } else if (data.type === "error") {
      finish("Error", typeof data.text === "string" ? data.text.slice(0, 8000) : "Execution failed.");
    }
  };
  window.addEventListener("message", receive);
  // An opaque-origin frame keeps code away from the portfolio's storage.
  // Fetch remains subject to the browser's normal CORS rules and has no cookies.
  frame.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src https: http: data:"><script>
    let worker;
    const send = data => parent.postMessage(data, '*');
    addEventListener('message', event => {
      if (event.source !== parent) return;
      if (event.data.type === 'stop') { if (worker) worker.terminate(); return; }
      if (event.data.type !== 'run' || worker) return;
      try {
        const url = URL.createObjectURL(new Blob([${JSON.stringify(WORKER_SOURCE).replace(/</g, "\\u003c")}], { type: 'text/javascript' }));
        worker = new Worker(url);
        URL.revokeObjectURL(url);
        worker.onmessage = event => send(event.data);
        worker.onerror = event => send({ type: 'error', text: event.message || 'Worker failed.' });
        worker.postMessage(event.data.code);
      } catch (error) { send({ type: 'error', text: error.message }); }
    });
    send({ type: 'ready' });
  </script>`;
  document.body.appendChild(frame);
  return stop;
}
