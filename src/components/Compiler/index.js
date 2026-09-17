import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlay, FiSquare, FiTrash2 } from "react-icons/fi";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { runJavaScript } from "./runtime";
import css from "./Compiler.module.scss";

const example = `// Write JavaScript, then press Run or Ctrl/Cmd + Enter.
const greet = (name) => "Hello, " + name + "!";
console.log(greet("world"));

const numbers = [1, 2, 3, 4, 5];
console.log("Doubled:", numbers.map(n => n * 2));
console.log("Total:", numbers.reduce((sum, n) => sum + n, 0));
`;

export default function Compiler() {
  const [code, setCode] = useState(example);
  const [output, setOutput] = useState([]);
  const [status, setStatus] = useState("Ready");
  const [vertical, setVertical] = useState(() => window.innerWidth <= 760);
  const stop = useRef(null);
  const runRef = useRef(null);
  const running = status === "Running";

  useEffect(() => {
    const title = document.title;
    document.title = "JavaScript Compiler | Snehasis Debbarman";
    return () => { stop.current?.(); document.title = title; };
  }, []);

  useEffect(() => {
    const onResize = () => setVertical(window.innerWidth <= 760);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const run = () => {
    stop.current?.();
    setOutput([]);
    setStatus("Running");
    stop.current = runJavaScript(code,
      (entry) => setOutput((rows) => [...rows, entry]),
      (result) => { stop.current = null; setStatus(result); });
  };
  runRef.current = run;

  return (
    <section className={css.compiler} aria-label="JavaScript compiler">
      <header className={css.header}>
        <Link to="/" className={css.back}><FiArrowLeft aria-hidden="true" /> Portfolio</Link>
        <h1><span className={css.badge}>JS</span> JavaScript Compiler</h1>
        <span className={css.shortcut}>Ctrl / ⌘ + Enter to run</span>
      </header>
      <Allotment className={css.workspace} vertical={vertical} proportionalLayout={false}>
        <Allotment.Pane preferredSize={vertical ? "55%" : "60%"} minSize={vertical ? 260 : 320}>
          <section className={css.panel} aria-label="Code editor">
          <div className={css.toolbar}>
            <span className={css.filename}>main.js</span>
            <div className={css.actions}>
              {running && <button onClick={() => { stop.current?.(); stop.current = null; setStatus("Stopped"); }}><FiSquare aria-hidden="true" /> Stop</button>}
              <button className={css.run} onClick={run} disabled={running}><FiPlay aria-hidden="true" /> Run</button>
            </div>
          </div>
          <div className={css.editor}>
            <Editor language="javascript" theme="vs-dark" value={code}
              onChange={(value) => setCode(value || "")}
              loading={<p className={css.empty}>Loading editor…</p>}
              options={{ fontSize: 16, minimap: { enabled: false }, padding: { top: 20 }, scrollBeyondLastLine: false, automaticLayout: true, tabSize: 2, wordWrap: "on", ariaLabel: "JavaScript source code" }}
              onMount={(editor, monaco) => editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => runRef.current())}
            />
          </div>
          </section>
        </Allotment.Pane>
        <Allotment.Pane minSize={vertical ? 220 : 280}>
          <section className={`${css.panel} ${css.outputPanel}`} aria-label="Console output">
          <div className={css.toolbar}>
            <h2>Console</h2>
            <button onClick={() => setOutput([])}><FiTrash2 aria-hidden="true" /> Clear</button>
          </div>
          <div className={css.output} role="log" aria-label="JavaScript output" tabIndex={0}>
            {output.length ? output.map((entry, index) => <pre key={index} className={css[entry.level]}>{entry.text}</pre>) : <p className={css.empty}>{running ? "Running your code…" : "Use console.log() to see your output here."}</p>}
          </div>
          <div className={css.status} role="status">{status}</div>
          </section>
        </Allotment.Pane>
      </Allotment>
      <footer className={css.footer}>Runs in your browser until you stop it · Drag the divider to resize · Fetch follows CORS</footer>
    </section>
  );
}
