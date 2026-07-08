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
        background: "hsl(14, 6%, 16%)",
        border: "1px solid hsla(38, 20%, 60%, 0.18)",
        borderRadius: 6,
        padding: "0 10px",
        transition: "all 0.2s ease",
        minWidth: 155,
      }}
      onFocus={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "hsla(40, 70%, 67%, 0.45)";
        el.style.background = "hsla(40, 70%, 67%, 0.06)";
        el.style.boxShadow = "0 0 0 2px hsla(40, 70%, 67%, 0.08)";
      }}
      onBlur={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "hsla(38, 20%, 60%, 0.18)";
        el.style.background = "hsl(14, 6%, 16%)";
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
        style={{ color: "hsl(30, 10%, 52%)", flexShrink: 0 }}
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
          color: "hsl(38, 25%, 94%)",
          fontSize: 12,
          width: "100%",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
        value={searchValue}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={getHotkeyHandler([["Enter", skip]])}
      />
      {nodeCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "hsl(40, 70%, 67%)", flexShrink: 0, fontWeight: 600 }}>
          <span>{currentNode + 1}</span>
          <span style={{ color: "#475569" }}>/</span>
          <span>{nodeCount}</span>
        </div>
      )}
    </div>
  );
}
