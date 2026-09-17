import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import css from "../styles/Blog.module.scss";

function tokensToReact(tokens) {
  if (typeof tokens === "string") return tokens;
  if (Array.isArray(tokens)) return tokens.map((token, index) => <span key={index}>{tokensToReact(token)}</span>);
  return <span className={`token ${tokens.type}`}>{tokensToReact(tokens.content)}</span>;
}

export function CodeBlock({ children }) {
  const code = String(children?.props?.children ?? "").replace(/\n$/, "");
  const language = /language-([\w-]+)/.exec(children?.props?.className || "")?.[1] || "text";
  const [status, setStatus] = useState("Copy code");
  const reset = useRef();
  const pre = useRef();
  useEffect(() => () => clearTimeout(reset.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied!");
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(pre.current);
      selection.removeAllRanges();
      selection.addRange(range);
      setStatus("Selected — press Ctrl/Cmd+C");
    }
    clearTimeout(reset.current);
    reset.current = setTimeout(() => setStatus("Copy code"), 3000);
  }
  const grammar = Prism.languages[language];
  return (
    <div className={css.code_block}>
      <div className={css.code_toolbar}>
        <span>{language}</span>
        <button type="button" onClick={copy} aria-label="Copy code"><span role="status">{status}</span></button>
      </div>
      <pre ref={pre} tabIndex={0} aria-label={`${language} code`}><code>{grammar ? tokensToReact(Prism.tokenize(code, grammar)) : code}</code></pre>
    </div>
  );
}

const components = {
  pre: CodeBlock,
  table: ({ children }) => <div className={css.table_scroll} tabIndex={0} role="region" aria-label="Comparison table"><table>{children}</table></div>,
  img: ({ node, ...props }) => <img {...props} loading="lazy" alt={props.alt || ""} />,
  h2: ({ node, children }) => <h2 id={`section-${node.position.start.line}`}>{children}</h2>,
  h3: ({ node, children }) => <h3 id={`section-${node.position.start.line}`}>{children}</h3>,
};

export default function MarkdownContent({ markdown }) {
  let fenced = false;
  const headings = [];
  markdown.split("\n").forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    if (!fenced && /^##\s+/.test(line)) headings.push({ id: `section-${index + 1}`, text: line.replace(/^##\s+/, "").replace(/[*`]/g, "") });
  });
  return <>
    {headings.length > 1 && <details className={css.contents} open><summary>On this page</summary><nav aria-label="Article sections"><ul>{headings.map(({ id, text }) => <li key={id}><a href={`#${id}`}>{text}</a></li>)}</ul></nav></details>}
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>{markdown}</ReactMarkdown>
  </>;
}
