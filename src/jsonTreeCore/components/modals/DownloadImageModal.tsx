import { Dialog, Switch, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { toPng, toSvg } from "html-to-image";
import { useStored } from "../../store/useStored";
import { CancelIcon } from "../../components/icons";

function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export type DownloadDesignModal = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DownloadImageModal(props: DownloadDesignModal) {
  const { isOpen, setOpen } = props;
  const lightmode = useStored((state) => state.lightmode);
  const [imageName, setImageName] = useState<string>("jsontree");
  const [isPNG, setIsPNG] = useState<boolean>(true);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);

  const handleClose = () => {
    setImageName("jsontree");
    setOpen(false);
  };

  const exportAsImage = async () => {
    try {
      const imageElement = document.querySelector("svg[id*='ref']") as HTMLElement;
      let exportImage = isPNG ? toPng : toSvg;
      const dataURI = await exportImage(imageElement, {
        quality: 1,
        backgroundColor: isTransparent ? "transparent" : lightmode ? "#f5f0e8" : "#171410",
      });
      downloadURI(dataURI, `${imageName}.${isPNG ? "png" : "svg"}`);
    } catch (error) {
    } finally {
      handleClose();
    }
  };

  const panel: React.CSSProperties = {
    width: "100%",
    maxWidth: 400,
    background: "var(--jt-bg2)",
    border: "1px solid var(--jt-border-warm)",
    borderRadius: 12,
    padding: "20px 24px 24px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--jt-border)",
    color: "var(--jt-text)",
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: "default",
  };

  const label: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "var(--jt-text-muted)",
    marginBottom: 6,
  };

  const input: React.CSSProperties = {
    width: "100%",
    background: "var(--jt-bg3)",
    border: "1px solid var(--jt-border-warm)",
    borderRadius: 6,
    padding: "8px 12px",
    color: "var(--jt-text)",
    fontSize: 13,
    fontFamily: "'Space Grotesk', sans-serif",
    outline: "none",
    cursor: "text",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" style={{ position: "relative", zIndex: 100 }} onClose={handleClose}>

        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div aria-hidden="true" style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
          }} />
        </Transition.Child>

        {/* Panel container */}
        <div style={{ position: "fixed", inset: 0, overflowY: "auto", cursor: "default" }}>
          <div style={{ display: "flex", minHeight: "100%", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel style={panel}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <Dialog.Title style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.5px", color: "var(--jt-text)" }}>
                    Download Image
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    style={{
                      width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "transparent", border: "none", borderRadius: 5,
                      color: "var(--jt-text-muted)", cursor: "pointer", padding: 2,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--jt-amber)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--jt-text-muted)")}
                  >
                    <CancelIcon />
                  </button>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--jt-border-warm)", marginBottom: 20 }} />

                {/* File name + format */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 20 }}>
                  <div style={{ flex: 1 }}>
                    <label style={label}>File Name</label>
                    <input
                      type="text"
                      aria-label="image name"
                      placeholder="jsontree"
                      value={imageName}
                      onChange={(e) => setImageName(e.target.value)}
                      style={input}
                      onFocus={e => {
                        e.target.style.borderColor = "hsla(40,70%,67%,0.5)";
                        e.target.style.boxShadow = "0 0 0 2px var(--jt-amber-glow)";
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = "var(--jt-border-warm)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* PNG / SVG toggle */}
                  <div style={{ display: "flex", height: 38, background: "var(--jt-bg3)", border: "1px solid var(--jt-border-warm)", borderRadius: 6, padding: 3, gap: 2 }}>
                    {["PNG", "SVG"].map((fmt) => {
                      const active = (fmt === "PNG") === isPNG;
                      return (
                        <button
                          key={fmt}
                          onClick={() => setIsPNG(fmt === "PNG")}
                          style={{
                            padding: "0 14px",
                            borderRadius: 4,
                            border: "none",
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: "1px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            background: active ? "var(--jt-amber)" : "transparent",
                            color: active ? "var(--jt-bg)" : "var(--jt-text-muted)",
                          }}
                        >
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Transparent background */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, padding: "12px 14px", background: "var(--jt-bg3)", borderRadius: 8, border: "1px solid var(--jt-border-warm)" }}>
                  <span style={{ fontSize: 13, color: "var(--jt-text-muted)" }}>Transparent background</span>
                  <Switch
                    checked={isTransparent}
                    onChange={setIsTransparent}
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      height: 22,
                      width: 40,
                      flexShrink: 0,
                      borderRadius: 99,
                      border: `1px solid ${isTransparent ? "var(--jt-amber)" : "var(--jt-border-warm)"}`,
                      background: isTransparent ? "var(--jt-amber-dim)" : "var(--jt-bg)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span className="sr-only">Transparent background</span>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 2,
                        left: isTransparent ? "calc(100% - 18px)" : 2,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: isTransparent ? "var(--jt-amber)" : "var(--jt-text-muted)",
                        transition: "all 0.2s ease",
                        boxShadow: isTransparent ? "0 0 6px var(--jt-amber-glow)" : "none",
                      }}
                    />
                  </Switch>
                </div>

                {/* Download button */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button
                    onClick={handleClose}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 6,
                      border: "1px solid var(--jt-border-warm)",
                      background: "transparent",
                      color: "var(--jt-text-muted)",
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--jt-amber)";
                      e.currentTarget.style.color = "var(--jt-amber)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--jt-border-warm)";
                      e.currentTarget.style.color = "var(--jt-text-muted)";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    aria-label="download image"
                    onClick={exportAsImage}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 6,
                      border: "1px solid var(--jt-amber)",
                      background: "var(--jt-amber)",
                      color: "var(--jt-bg)",
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: "0 0 12px var(--jt-amber-glow)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "hsla(40,70%,72%,1)";
                      e.currentTarget.style.boxShadow = "0 0 20px var(--jt-amber-glow)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "var(--jt-amber)";
                      e.currentTarget.style.boxShadow = "0 0 12px var(--jt-amber-glow)";
                    }}
                  >
                    Download
                  </button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
