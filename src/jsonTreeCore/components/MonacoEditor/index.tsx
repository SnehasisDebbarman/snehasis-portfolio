import Editor, { loader, Monaco } from "@monaco-editor/react";
import { useApp } from "../../store/useApp";
import { useStored } from "../../store/useStored";

loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs",
  },
});

// Portfolio-matched Monaco theme: warm dark + amber accents
const definePortfolioTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme("portfolio-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // JSON keys → amber (portfolio accent)
      { token: "string.key.json",      foreground: "d4a373",  fontStyle: "" },
      // String values → warm off-white
      { token: "string.value.json",    foreground: "e9c46a",  fontStyle: "" },
      // Numbers → warm teal
      { token: "number.json",          foreground: "84c0a8",  fontStyle: "" },
      // Booleans → muted amber
      { token: "keyword.json",         foreground: "c2884b",  fontStyle: "italic" },
      // null
      { token: "null.json",            foreground: "8a7968",  fontStyle: "italic" },
      // Braces / brackets → warm muted
      { token: "delimiter.bracket",    foreground: "a89070" },
      { token: "delimiter.array",      foreground: "a89070" },
      { token: "delimiter.colon",      foreground: "706050" },
      { token: "delimiter.comma",      foreground: "706050" },
    ],
    colors: {
      // Editor backgrounds — portfolio warm dark
      "editor.background":                "#1a1714",
      "editor.foreground":                "#f0e6d3",
      "editorLineNumber.foreground":      "#4a3f35",
      "editorLineNumber.activeForeground":"#c8a97a",
      "editor.lineHighlightBackground":   "#221e1a",
      "editor.selectionBackground":       "#c8a97a30",
      "editor.inactiveSelectionBackground":"#c8a97a18",
      "editorIndentGuide.background":     "#2e2820",
      "editorIndentGuide.activeBackground":"#c8a97a25",
      "editorCursor.foreground":          "#c8a97a",
      "editor.findMatchBackground":       "#c8a97a40",
      "editor.findMatchHighlightBackground":"#c8a97a20",
      // Gutter / sidebar
      "editorGutter.background":          "#171410",
      // Scrollbar
      "scrollbarSlider.background":       "#3a322a",
      "scrollbarSlider.hoverBackground":  "#c8a97a40",
      "scrollbarSlider.activeBackground": "#c8a97a70",
      // Brackets match
      "editorBracketMatch.background":    "#c8a97a30",
      "editorBracketMatch.border":        "#c8a97a60",
    },
  });

  monaco.editor.defineTheme("portfolio-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "string.key.json",   foreground: "7c5c30" },
      { token: "string.value.json", foreground: "a0522d" },
      { token: "number.json",       foreground: "2e7d6b" },
      { token: "keyword.json",      foreground: "8b4513", fontStyle: "italic" },
      { token: "null.json",         foreground: "888888", fontStyle: "italic" },
    ],
    colors: {
      "editor.background":      "#f5f0e8",
      "editor.foreground":      "#2d2013",
      "editorCursor.foreground":"#c8a97a",
    },
  });
};

const editorOptions = {
  formatOnPaste: true,
  formatOnType: true,
  minimap: { enabled: false },
  fontFamily: "'Share Tech Mono', 'JetBrains Mono', 'Fira Code', monospace",
  fontSize: 13,
  lineHeight: 22,
  padding: { top: 16, bottom: 16 },
  scrollbar: {
    verticalScrollbarSize: 4,
    horizontalScrollbarSize: 4,
  },
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  renderLineHighlight: "gutter" as const,
  smoothScrolling: true,
  accessibilitySupport: "off" as const,
};

export default function MonacoEditor() {
  const contents = useApp((state) => state.contents);
  const setContents = useApp((state) => state.setContents);
  const setError = useApp((state) => state.setError);
  const lightmode = useStored((state) => state.lightmode);

  return (
    <Editor
      height="100%"
      language="json"
      theme={lightmode ? "portfolio-light" : "portfolio-dark"}
      value={contents}
      options={editorOptions}
      beforeMount={definePortfolioTheme}
      onValidate={(errors) => setError(errors[0]?.message)}
      onChange={(contents) => {
        let finalContents = contents || "";
        const nextDataMatch = finalContents.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
        if (nextDataMatch && nextDataMatch[1]) {
          try {
            // Optional: try parsing to ensure it's valid before replacing the editor content
            const extracted = nextDataMatch[1].trim();
            JSON.parse(extracted);
            // Format it nicely
            finalContents = JSON.stringify(JSON.parse(extracted), null, 2);
          } catch (e) {
            // If it fails to parse, just use the extracted text as is
            finalContents = nextDataMatch[1].trim();
          }
        }
        setContents({ contents: finalContents, skipUpdate: true });
      }}
    />
  );
}
