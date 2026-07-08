import { useFocusNode } from "../hooks/useFocusNode";
import { getHotkeyHandler } from "../hooks/useHotKeys";

export function Searchbar() {
  const [searchValue, setValue, skip, nodeCount, currentNode] = useFocusNode();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: 32,
        background: "var(--jt-bg3)",
        border: "1px solid var(--jt-border-warm)",
        borderRadius: 6,
        padding: "0 10px",
        transition: "all 0.2s ease",
        minWidth: 155,
      }}
      onFocus={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--jt-amber)";
        el.style.background = "var(--jt-amber-dim)";
        el.style.boxShadow = "0 0 0 2px var(--jt-amber-glow)";
      }}
      onBlur={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--jt-border-warm)";
        el.style.background = "var(--jt-bg3)";
        el.style.boxShadow = "none";
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--jt-text-muted)", flexShrink: 0 }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        placeholder="Search Node"
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--jt-text)",
          fontSize: 12,
          width: "100%",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
        value={searchValue}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={getHotkeyHandler([["Enter", skip]])}
      />
      {nodeCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--jt-amber)", flexShrink: 0, fontWeight: 600 }}>
          <span>{currentNode + 1}</span>
          <span style={{ color: "var(--jt-text-muted)" }}>/</span>
          <span>{nodeCount}</span>
        </div>
      )}
    </div>
  );
}
