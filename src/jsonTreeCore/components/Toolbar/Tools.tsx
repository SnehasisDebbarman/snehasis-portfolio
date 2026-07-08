import { useState } from "react";
import {
  DownloadIcon,
  FocusIcon,
  MoonIcon,
  SunIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../components/icons";
import { useTree } from "../../store/useTree";
import { useHotkeys } from "../../hooks/useHotKeys";
import { useStored } from "../../store/useStored";
import { DownloadImageModal } from "../../components/modals/DownloadImageModal";

// Consistent icon size across all toolbar icon-buttons
const ICON_SIZE = 15;

function IconBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        padding: 0,
        background: hovered ? "var(--jt-amber-dim)" : "var(--jt-bg3)",
        border: `1px solid ${hovered ? "hsla(40,70%,55%,0.4)" : "var(--jt-border-warm)"}`,
        borderRadius: 6,
        color: hovered ? "var(--jt-amber)" : "var(--jt-text-muted)",
        cursor: "pointer",
        transition: "all 0.18s ease",
        flexShrink: 0,
      }}
    >
      <span style={{ width: ICON_SIZE, height: ICON_SIZE, display: "flex" }}>
        {children}
      </span>
    </button>
  );
}

export default function Tools() {
  const [isDownloadModalOpen, setIsDownloadModal] = useState<boolean>(false);
  const centerView = useTree((state) => state.centerView);
  const zoomIn = useTree((state) => state.zoomIn);
  const zoomOut = useTree((state) => state.zoomOut);
  const lightmode = useStored((state) => state.lightmode);
  const setLightTheme = useStored((state) => state.setLightTheme);

  useHotkeys([
    ["mod,shift,+", zoomIn],
    ["mod,shift,-", zoomOut],
    ["mod,shift,c", centerView],
  ]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <IconBtn title="Download as image" onClick={() => setIsDownloadModal(true)}>
        <DownloadIcon />
      </IconBtn>
      <DownloadImageModal isOpen={isDownloadModalOpen} setOpen={setIsDownloadModal} />

      <IconBtn title="Zoom In (⌘⇧+)" onClick={zoomIn}>
        <ZoomInIcon />
      </IconBtn>

      <IconBtn title="Zoom Out (⌘⇧−)" onClick={zoomOut}>
        <ZoomOutIcon />
      </IconBtn>

      <IconBtn title="Center View (⌘⇧C)" onClick={centerView}>
        <FocusIcon />
      </IconBtn>

      <IconBtn
        title={lightmode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        onClick={() => setLightTheme(!lightmode)}
      >
        {lightmode ? <MoonIcon /> : <SunIcon />}
      </IconBtn>
    </div>
  );
}
