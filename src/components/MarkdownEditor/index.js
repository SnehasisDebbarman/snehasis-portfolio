import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MarkdownContent from "../MarkdownContent";
import articleCss from "../../styles/Blog.module.scss";
import css from "./MarkdownEditor.module.scss";

export const DRAFT_KEY = "snehasis.markdown.draft.v1";
export const MAX_FILE_BYTES = 1024 * 1024;
export const SAMPLE = `# A little space to write

Edit on the left. See your Markdown come to life on the right.

## Make it yours

- **Bold ideas**, *small details*, and [useful links](https://snehasis.in)
- Lists, tables, and syntax-highlighted code
- Your draft stays in this browser

## A tiny checklist

- [x] Start writing
- [ ] Open a Markdown file
- [ ] Download your finished draft

| Feature | Ready |
| --- | --- |
| Live preview | Yes |
| GitHub-flavored Markdown | Yes |

\`\`\`js
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

> Good writing starts with a first draft.
`;

function readDraft() {
  try {
    const stored = JSON.parse(localStorage.getItem(DRAFT_KEY));
    if (stored && typeof stored.markdown === "string" && typeof stored.name === "string") return stored;
  } catch { /* Storage can be unavailable or contain an invalid draft. */ }
  return { markdown: SAMPLE, name: "untitled.md" };
}

export function downloadName(name) {
  // Remove path separators and control characters from download filenames.
  // eslint-disable-next-line no-control-regex
  const clean = name.replace(/[\\/<>:"|?*\u0000-\u001f]/g, "-").trim() || "untitled";
  return /\.(md|markdown)$/i.test(clean) ? clean : `${clean}.md`;
}

export default function MarkdownEditor() {
  const [draft, setDraft] = useState(readDraft);
  const [mode, setMode] = useState("split");
  const [status, setStatus] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saving draft…");
  const [opening, setOpening] = useState(false);
  const input = useRef();
  const editor = useRef();
  const latestDraft = useRef(draft);
  latestDraft.current = draft;
  const { markdown, name } = draft;
  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;

  useEffect(() => {
    const previous = document.title;
    document.title = "Markdown editor & viewer | Snehasis Debbarman";
    return () => { document.title = previous; };
  }, []);

  useEffect(() => {
    setSaveStatus("Saving draft…");
    const save = () => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        setSaveStatus("Draft saved in this browser");
      } catch {
        setSaveStatus("Local saving unavailable — download to keep your draft");
      }
    };
    const timer = setTimeout(save, 350);
    return () => clearTimeout(timer);
  }, [draft]);

  useEffect(() => {
    // Flush on navigation or page exit as well as after typing pauses.
    const flush = () => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(latestDraft.current)); } catch { /* UI already reports storage failure. */ }
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  async function openFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/\.(md|markdown|txt)$/i.test(file.name)) {
      setStatus("Choose a .md, .markdown, or .txt file.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setStatus("Choose a file smaller than 1 MB.");
      return;
    }
    if (markdown !== SAMPLE && !window.confirm("Replace your current draft with this file?")) return;
    setOpening(true);
    try {
      const text = await file.text();
      setDraft({ markdown: text, name: downloadName(file.name.replace(/\.txt$/i, "")) });
      setStatus(`Opened ${file.name}.`);
    } catch {
      setStatus("Could not read that file. Your draft is unchanged.");
    } finally {
      setOpening(false);
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName(name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Markdown download started.");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("Markdown copied.");
    } catch {
      setMode("edit");
      setStatus("Clipboard unavailable. Select the text and press Ctrl/Cmd+C.");
      setTimeout(() => { editor.current?.focus(); editor.current?.select(); }, 0);
    }
  }

  function newDraft() {
    if (markdown && !window.confirm("Start a new document? Download your current draft first if you want to keep it.")) return;
    setDraft({ markdown: "", name: "untitled.md" });
    setStatus("New document ready.");
    setMode("split");
  }

  return (
    <section className={css.workspace} aria-label="Markdown workspace">
      <header className={css.header}>
        <div>
          <Link to="/" className={css.back}>← Portfolio</Link>
          <h1>Markdown <span>studio</span><span className={css.dot}>.</span></h1>
          <p>A quiet space for your next README, note, or idea.</p>
        </div>
        <span className={css.badge}>WRITE · PREVIEW · KEEP</span>
      </header>

      <div className={css.toolbar}>
        <label className={css.filename}>Document name
          <input aria-label="Document name" value={name} maxLength={100} disabled={opening}
            onChange={event => setDraft(current => ({ ...current, name: event.target.value }))} />
        </label>
        <div className={css.actions}>
          <input ref={input} type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" hidden onChange={openFile} />
          <button type="button" disabled={opening} onClick={() => input.current.click()}>Open file</button>
          <button type="button" disabled={opening} onClick={copy}>Copy Markdown</button>
          <button type="button" disabled={opening} onClick={newDraft}>New</button>
          <button type="button" className={css.primary} onClick={download}>Download .md ↓</button>
        </div>
      </div>

      <div className={css.viewbar}>
        <div className={css.modes} role="group" aria-label="Workspace view">
          {[['split', 'Split view'], ['edit', 'Editor'], ['preview', 'Preview']].map(([value, label]) => (
            <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>{label}</button>
          ))}
        </div>
        <span>GitHub-flavored Markdown</span>
      </div>

      <div className={`${css.panes} ${mode === "split" ? css.split : css.single}`}>
        {mode !== "preview" && <div className={css.pane}>
          <div className={css.paneHeader}><label htmlFor="markdown-source">SOURCE</label><span>.md</span></div>
          <textarea id="markdown-source" ref={editor} value={markdown} disabled={opening} spellCheck={false}
            placeholder="# Start writing…" aria-label="Markdown source"
            onChange={event => setDraft(current => ({ ...current, markdown: event.target.value }))} />
        </div>}
        {mode !== "edit" && <div className={css.pane}>
          <div className={css.paneHeader}><span>LIVE PREVIEW</span><span className={css.live}>● Live</span></div>
          <article className={`${css.preview} ${articleCss.article_body}`} aria-label="Markdown preview">
            {markdown ? <MarkdownContent markdown={markdown} /> : <p className={css.empty}>Your words will appear here. Start with a heading, a list, or an idea.</p>}
          </article>
        </div>}
      </div>

      <footer className={css.footer}>
        <span>{words} words · {markdown.length} characters</span>
        <span>{saveStatus}</span>
        <span role="status">{opening ? "Opening file…" : status}</span>
      </footer>
      <p className={css.note}>Drafts are saved on this device only. Download a copy to keep or share it. Raw HTML is disabled; Markdown images may load from external sites.</p>
    </section>
  );
}
