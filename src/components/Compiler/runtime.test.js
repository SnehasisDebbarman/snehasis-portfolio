import vm from "vm";
import { WORKER_SOURCE, runJavaScript } from "./runtime";

test("executes JavaScript, formats values, catches errors, and bounds execution", async () => {
  async function execute(code) {
    const messages = [];
    const scope = { console: {}, postMessage: (data) => messages.push(data), setTimeout, setInterval, clearTimeout, clearInterval, addEventListener() {}, fetch: () => Promise.resolve({ json: () => Promise.resolve({ answer: 42 }) }) };
    const context = vm.createContext(scope);
    vm.runInContext(WORKER_SOURCE, context);
    await scope.onmessage({ data: code });
    await new Promise((resolve) => setTimeout(resolve, 90));
    return messages;
  }
  const result = await execute('console.log("sum", [1,2,3].reduce((a,b) => a+b, 0)); const x = {}; x.x = x; console.log(x, 1n, undefined); await Promise.resolve(); console.warn("careful"); globalThis.setTimeout(() => console.log("later"), 5);');
  expect(result[0]).toEqual({ type: "output", level: "log", text: "sum 6" });
  expect(result[1].text).toContain("[Circular]");
  expect(result[1].text).toContain("undefined");
  expect(result.some((row) => row.level === "warn")).toBe(true);
  expect(result[result.length - 2].text).toBe("later");
  expect(result[result.length - 1].type).toBe("done");
  const callbackResult = await execute('fetch("mock").then((response) => response.json()).then((data) => console.log("callback", data.answer));');
  expect(callbackResult.some((row) => row.text === "callback 42")).toBe(true);
  expect(callbackResult.at(-1).type).toBe("done");
  expect((await execute('throw new Error("broken")'))[0].text).toBe("Error: broken");
  expect((await execute('const ='))[0].text).toContain("SyntaxError");
  const flood = await execute('for(let i=0;i<1000;i++) console.log(i)');
  expect(flood.filter((row) => row.type === "output")).toHaveLength(1000);
  expect(flood.at(-1).type).toBe("done");

  jest.useFakeTimers();
  const output = jest.fn();
  const finish = jest.fn();
  const stop = runJavaScript('while(true) {}', output, finish);
  const frame = document.querySelector("iframe");
  expect(frame.getAttribute("sandbox")).toBe("allow-scripts");
  expect(frame.srcdoc).toContain("connect-src https: http: data:");
  window.dispatchEvent(new MessageEvent("message", { source: window, data: { type: "done" } }));
  expect(finish).not.toHaveBeenCalled();
  jest.advanceTimersByTime(5000);
  stop();
  expect(finish).not.toHaveBeenCalled();
  expect(document.querySelector("iframe")).toBeNull();
  finish.mockClear();
  const cancel = runJavaScript('', output, finish);
  cancel();
  jest.advanceTimersByTime(5000);
  expect(finish).not.toHaveBeenCalled();
  jest.useRealTimers();
});
