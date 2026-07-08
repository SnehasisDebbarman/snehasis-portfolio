import { Fragment, useMemo, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { getNextDirection } from "../../core/graph/getNextDirection";
import { useHotkeys } from "../../hooks/useHotKeys";
import { useTree } from "../../store/useTree";
import {
  ChevronDownIcon,
  FocusIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  ArrowPath,
  DownloadIcon,
  JsonIcon,
} from "../../components/icons";
import { useStored } from "../../store/useStored";
import { DownloadImageModal } from "../../components/modals/DownloadImageModal";

type ShortcutsProps = {
  onOpenImportModal: () => void;
  onOpenStatsModal: () => void;
  onToggleSchemaMode: () => void;
};

// Inline style helpers (portfolio palette)
const MENU_BTN: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 32,
  padding: "0 12px",
  background: "var(--jt-bg3)",
  border: "1px solid var(--jt-border-warm)",
  borderRadius: 6,
  color: "var(--jt-text-muted)",
  fontSize: 11,
  fontWeight: 500,
  fontFamily: "'Space Grotesk', sans-serif",
  letterSpacing: "1px",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",
};

const DROPDOWN: React.CSSProperties = {
  position: "absolute",
  right: 0,
  zIndex: 50,
  marginTop: 8,
  width: 240,
  background: "var(--jt-bg2)",
  border: "1px solid var(--jt-border-warm)",
  borderRadius: 10,
  padding: "6px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px var(--jt-border)",
  outline: "none",
};

const ITEM_BASE: React.CSSProperties = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  borderRadius: 6,
  padding: "7px 10px",
  fontSize: 12,
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 500,
  color: "var(--jt-text-muted)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  transition: "all 0.15s ease",
};

const ITEM_ACTIVE: React.CSSProperties = {
  ...ITEM_BASE,
  background: "var(--jt-amber-dim)",
  color: "var(--jt-amber)",
};

const KBD_BASE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  padding: "2px 6px",
  background: "var(--jt-bg3)",
  border: "1px solid var(--jt-border-warm)",
  borderRadius: 4,
  fontSize: 10,
  fontFamily: "'Share Tech Mono', monospace",
  color: "var(--jt-text-muted)",
  letterSpacing: "0.5px",
  whiteSpace: "nowrap",
  flexShrink: 0,
};

const KBD_ACTIVE: React.CSSProperties = {
  ...KBD_BASE,
  background: "var(--jt-amber-dim)",
  border: "1px solid var(--jt-amber)",
  color: "var(--jt-amber)",
};

const ICON_WRAP: React.CSSProperties = { width: 15, height: 15, display: "flex", flexShrink: 0 };

function ShortcutItem({
  label,
  shortcut,
  icon,
  onClick,
}: {
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Menu.Item>
      {() => (
        <button
          style={hovered ? ITEM_ACTIVE : ITEM_BASE}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {icon && <span style={ICON_WRAP}>{icon}</span>}
            {label}
          </span>
          {shortcut && (
            <kbd style={hovered ? KBD_ACTIVE : KBD_BASE}>{shortcut}</kbd>
          )}
        </button>
      )}
    </Menu.Item>
  );
}

export default function Shortcuts(props: ShortcutsProps) {
  const { onOpenImportModal, onOpenStatsModal, onToggleSchemaMode } = props;
  const fullscreen = useTree((state) => state.fullscreen);
  const toggleFullscreen = useTree((state) => state.toggleFullscreen);
  const theme = useStored((state) => state.lightmode);
  const setTheme = useStored((state) => state.setLightTheme);
  const centerView = useTree((state) => state.centerView);
  const zoomIn = useTree((state) => state.zoomIn);
  const zoomOut = useTree((state) => state.zoomOut);
  const direction = useTree((state) => state.direction);
  const setDirection = useTree((state) => state.setDirection);

  const [isDownloadModalOpen, setIsDownloadModal] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const modKey = useMemo(() => {
    if (typeof window !== "undefined") {
      if (/Mac|iPod|iPhone|iPad/.test(navigator.platform)) return "⌘";
      return "CTRL";
    }
    return "";
  }, []);

  const toggleEditor = () => toggleFullscreen(!fullscreen);
  const toggleDirection = () => setDirection(getNextDirection(direction));

  useHotkeys([
    ["mod,shift,E", toggleEditor],
    ["mod,shift,D", toggleDirection],
    ["mod,shift,I", onOpenImportModal],
    ["mod,shift,J", onOpenStatsModal],
    ["mod,shift,S", onToggleSchemaMode],
  ]);

  const btnStyle: React.CSSProperties = btnHovered
    ? { ...MENU_BTN, background: "var(--jt-amber-dim)", borderColor: "var(--jt-amber)", color: "var(--jt-amber)" }
    : MENU_BTN;

  return (
    <>
      <Menu as="div" style={{ position: "relative" }}>
        <Menu.Button
          style={btnStyle}
          aria-label="Shortcut menu"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
        >
          <span className="hidden md:inline">Shortcuts</span>
          <span style={ICON_WRAP} className="hidden md:flex">
            <ChevronDownIcon />
          </span>
          <span style={ICON_WRAP} className="md:hidden">
            <MenuIcon />
          </span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items style={DROPDOWN}>

            {/* Divider label */}
            <div style={{ padding: "4px 10px 6px", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--jt-text-muted)", fontFamily: "'Space Grotesk', sans-serif", borderBottom: "1px solid var(--jt-border-warm)", marginBottom: 4 }}>
              Shortcuts
            </div>

            <ShortcutItem label="Toggle Editor" shortcut={`${modKey} ⇧ E`} icon={<JsonIcon />} onClick={toggleEditor} />
            <ShortcutItem label="JSON Stats"    shortcut={`${modKey} ⇧ J`} icon={<JsonIcon />} onClick={onOpenStatsModal} />
            <ShortcutItem label="Schema Mode"   shortcut={`${modKey} ⇧ S`} icon={<JsonIcon />} onClick={onToggleSchemaMode} />
            <ShortcutItem label="Import URL"    shortcut={`${modKey} ⇧ I`} icon={<JsonIcon />} onClick={onOpenImportModal} />
            <ShortcutItem label="Rotate Layout" shortcut={`${modKey} ⇧ D`} icon={<ArrowPath />} onClick={toggleDirection} />
            <ShortcutItem label="Center View"   shortcut={`${modKey} ⇧ C`} icon={<FocusIcon />} onClick={centerView} />
            <ShortcutItem label="Zoom In"       shortcut={`${modKey} ⇧ +`} onClick={zoomIn} />
            <ShortcutItem label="Zoom Out"      shortcut={`${modKey} ⇧ −`} onClick={zoomOut} />

            <div style={{ borderTop: "1px solid var(--jt-border-warm)", marginTop: 4, paddingTop: 4 }}>
              <ShortcutItem
                label={theme ? "Dark Mode" : "Light Mode"}
                icon={theme ? <MoonIcon /> : <SunIcon />}
                onClick={() => setTheme(!theme)}
              />
              <ShortcutItem
                label="Download Image"
                icon={<DownloadIcon />}
                onClick={() => setIsDownloadModal(true)}
              />
            </div>

          </Menu.Items>
        </Transition>
      </Menu>

      <DownloadImageModal isOpen={isDownloadModalOpen} setOpen={setIsDownloadModal} />
    </>
  );
}
