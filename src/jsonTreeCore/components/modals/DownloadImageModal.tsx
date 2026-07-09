import { Dialog, Switch, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
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

/**
 * Inline all computed styles from a source element onto a cloned element,
 * then recurse into children. This ensures no CSS class / variable dependency.
 */
const inlineStyles = (source: Element, target: Element) => {
  if (source instanceof HTMLElement || source instanceof SVGElement) {
    const computed = getComputedStyle(source);
    const targetEl = target as HTMLElement | SVGElement;

    // For SVG elements, set key presentational attributes directly
    if (source instanceof SVGElement && !(source instanceof SVGSVGElement)) {
      const svgTarget = target as SVGElement;
      const fill = computed.getPropertyValue("fill");
      const stroke = computed.getPropertyValue("stroke");
      const strokeWidth = computed.getPropertyValue("stroke-width");
      if (fill) svgTarget.setAttribute("fill", fill);
      if (stroke && stroke !== "none") svgTarget.setAttribute("stroke", stroke);
      if (strokeWidth) svgTarget.setAttribute("stroke-width", strokeWidth);
    }

    // For HTML elements (inside foreignObject), inline critical CSS properties
    if (source instanceof HTMLElement) {
      const importantProps = [
        "color", "background-color", "background",
        "border", "border-color", "border-width", "border-style", "border-radius",
        "font-family", "font-size", "font-weight", "font-style",
        "display", "flex-direction", "align-items", "justify-content", "gap",
        "padding", "margin", "overflow", "text-overflow", "white-space",
        "width", "height", "max-width", "max-height", "min-width", "min-height",
        "box-sizing", "text-align", "letter-spacing", "line-height",
        "opacity", "visibility", "position", "top", "left", "right", "bottom",
        "box-shadow", "text-transform",
      ];
      importantProps.forEach((prop) => {
        const val = computed.getPropertyValue(prop);
        if (val) {
          (targetEl as HTMLElement).style.setProperty(prop, val);
        }
      });
    }
  }

  // Recurse into children
  const sourceChildren = source.children;
  const targetChildren = target.children;
  for (let i = 0; i < sourceChildren.length && i < targetChildren.length; i++) {
    inlineStyles(sourceChildren[i], targetChildren[i]);
  }
};

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
      const svgOriginal = document.querySelector("svg[id*='ref']") as SVGSVGElement;
      if (!svgOriginal) return;

      // Build a map from each live foreignObject to its text lines and colors,
      // reading from the actual rendered DOM (so CSS variables are already resolved)
      type TextLine = { text: string; color: string; isKey?: boolean };
      type FoData = { x: number; y: number; width: number; height: number; lines: TextLine[] };
      const foDataList: FoData[] = [];
      const liveFos = svgOriginal.querySelectorAll("foreignObject");

      liveFos.forEach((fo) => {
        const fx = parseFloat(fo.getAttribute("x") || "0");
        const fy = parseFloat(fo.getAttribute("y") || "0");
        const fw = parseFloat(fo.getAttribute("width") || "0");
        const fh = parseFloat(fo.getAttribute("height") || "0");

        const lines: TextLine[] = [];

        // Collect all visible text nodes with their computed color
        const textSpans = fo.querySelectorAll("span[data-key], span[class*='jt-node']");
        if (textSpans.length > 0) {
          textSpans.forEach((span) => {
            const text = (span as HTMLElement).innerText?.trim();
            if (!text) return;
            const color = getComputedStyle(span as HTMLElement).color;
            lines.push({ text, color });
          });
        } else {
          // Fallback: grab all inner text
          const inner = fo.querySelector(".jt-tree-node-inner");
          if (inner) {
            const text = (inner as HTMLElement).innerText?.trim().replace(/\n+/g, " • ");
            if (text) {
              const color = getComputedStyle(inner as HTMLElement).color;
              lines.push({ text, color });
            }
          }
        }

        if (lines.length > 0) {
          foDataList.push({ x: fx, y: fy, width: fw, height: fh, lines });
        }
      });

      // Clone the SVG
      const svgClone = svgOriginal.cloneNode(true) as SVGSVGElement;
      inlineStyles(svgOriginal, svgClone);

      // Replace each foreignObject in the clone with SVG <text> elements
      const clonedFos = Array.from(svgClone.querySelectorAll("foreignObject"));
      clonedFos.forEach((fo, idx) => {
        const data = foDataList[idx];
        if (!data) { fo.remove(); return; }

        const ns = "http://www.w3.org/2000/svg";
        const { x, y, width, height, lines } = data;

        // Create a group to hold the text
        const g = document.createElementNS(ns, "g");

        if (lines.length === 1) {
          // Single-line node: center the text
          const text = document.createElementNS(ns, "text");
          text.setAttribute("x", String(x + width / 2));
          text.setAttribute("y", String(y + height / 2 + 4));
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("font-family", "Share Tech Mono, JetBrains Mono, monospace");
          text.setAttribute("font-size", "11");
          text.setAttribute("fill", lines[0].color || (lightmode ? "#332b1a" : "#f0e6d3"));
          text.setAttribute("font-weight", "500");
          text.textContent = lines[0].text;
          g.appendChild(text);
        } else {
          // Multi-line node (object node): stack lines
          const lineH = Math.min(16, height / (lines.length + 1));
          const startY = y + height / 2 - ((lines.length - 1) * lineH) / 2;
          lines.forEach((line, i) => {
            const text = document.createElementNS(ns, "text");
            text.setAttribute("x", String(x + 10));
            text.setAttribute("y", String(startY + i * lineH));
            text.setAttribute("text-anchor", "start");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("font-family", "Share Tech Mono, JetBrains Mono, monospace");
            text.setAttribute("font-size", "10");
            text.setAttribute("fill", line.color || (lightmode ? "#332b1a" : "#f0e6d3"));
            // Truncate long text
            const maxChars = Math.floor(width / 6.5);
            text.textContent = line.text.length > maxChars
              ? line.text.slice(0, maxChars - 1) + "…"
              : line.text;
            g.appendChild(text);
          });
        }

        fo.parentNode?.replaceChild(g, fo);
      });

      // Set viewBox and dimensions
      const bbox = svgOriginal.getBBox();
      const padding = 40;
      svgClone.setAttribute("viewBox", `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`);
      svgClone.setAttribute("width", String(bbox.width + padding * 2));
      svgClone.setAttribute("height", String(bbox.height + padding * 2));
      svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgClone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

      // Background rect
      if (!isTransparent) {
        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute("x", String(bbox.x - padding));
        bgRect.setAttribute("y", String(bbox.y - padding));
        bgRect.setAttribute("width", String(bbox.width + padding * 2));
        bgRect.setAttribute("height", String(bbox.height + padding * 2));
        bgRect.setAttribute("fill", lightmode ? "#f5f0e8" : "#171410");
        svgClone.insertBefore(bgRect, svgClone.firstChild);
      }

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgClone);

      if (!isPNG) {
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        downloadURI(svgUrl, `${imageName}.svg`);
        setTimeout(() => URL.revokeObjectURL(svgUrl), 1000);
      } else {
        const encoded = btoa(unescape(encodeURIComponent(svgString)));
        const svgDataUrl = `data:image/svg+xml;base64,${encoded}`;
        const W = bbox.width + padding * 2;
        const H = bbox.height + padding * 2;
        const scale = 2;

        await new Promise<void>((resolve, reject) => {
          const canvas = document.createElement("canvas");
          canvas.width = W * scale;
          canvas.height = H * scale;
          const ctx = canvas.getContext("2d")!;
          ctx.scale(scale, scale);

          const img = new Image();
          img.onload = () => {
            try {
              if (!isTransparent) {
                ctx.fillStyle = lightmode ? "#f5f0e8" : "#171410";
                ctx.fillRect(0, 0, W, H);
              }
              ctx.drawImage(img, 0, 0, W, H);
              downloadURI(canvas.toDataURL("image/png", 1.0), `${imageName}.png`);
              resolve();
            } catch (e) { reject(e); }
          };
          img.onerror = reject;
          img.src = svgDataUrl;
        });
      }
    } catch (error) {
      console.error("Export failed:", error);
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
