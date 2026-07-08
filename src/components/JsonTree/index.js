import React, { useEffect } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../jsonTreeCore/tailwind.css";
import "./JsonTree.css";

import Navbar from "../../jsonTreeCore/components/Navbar";
import MonacoEditor from "../../jsonTreeCore/components/MonacoEditor";
import TreeEditor from "../../jsonTreeCore/components/TreeEditor";
import { useApp } from "../../jsonTreeCore/store/useApp";
import { useTree } from "../../jsonTreeCore/store/useTree";
import { useStored } from "../../jsonTreeCore/store/useStored";
import { useJsonDrop } from "../../jsonTreeCore/hooks/useJsonDrop";
import { JSON_TEMPLATE } from "../../jsonTreeCore/constants/json";

const NAVBAR_HEIGHT = 56;

function useBreakpoint(breakpoint) {
  const [isScreenLessThan, setIsScreenLessThan] = React.useState(false);
  useEffect(() => {
    const check = () => setIsScreenLessThan(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return { isScreenLessThan };
}

export default function JsonTree() {
  const setContents = useApp((state) => state.setContents);
  const fullscreen = useTree((state) => state.fullscreen);
  const toggleFullscreen = useTree((state) => state.toggleFullscreen);
  const lightmode = useStored((state) => state.lightmode);
  const { onDragEnter, onDragLeave, onDragOver, onDrop } = useJsonDrop();

  const { isScreenLessThan } = useBreakpoint(768);

  useEffect(() => {
    if (lightmode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [lightmode]);

  useEffect(() => {
    setContents({ contents: JSON_TEMPLATE, hasChanges: false });
  }, [setContents]);

  // Removed auto-fullscreen on mobile so users can use the editor on mobile too

  const contentHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;

  return (
    <div
      className="json-tree-root"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--jt-bg)",
      }}
    >
      <Navbar />
      <main
        style={{
          display: "flex",
          height: contentHeight,
          width: "100%",
          flexDirection: isScreenLessThan ? "column" : "row",
        }}
      >
        <Allotment
          style={{ position: "relative", height: contentHeight }}
          proportionalLayout={false}
          vertical={isScreenLessThan}
        >
          <Allotment.Pane
            style={{ height: "100%", background: "var(--jt-bg2)" }}
            preferredSize={isScreenLessThan ? "40%" : 450}
            minSize={fullscreen ? 0 : (isScreenLessThan ? 100 : 450)}
            maxSize={isScreenLessThan ? Infinity : 700}
            visible={!fullscreen}
          >
            <MonacoEditor />
          </Allotment.Pane>
          <Allotment.Pane
            minSize={0}
            maxSize={Infinity}
            style={{ display: "flex", width: "100%", position: "relative", background: "var(--jt-bg)" }}
          >
            <TreeEditor />
          </Allotment.Pane>
        </Allotment>
      </main>
    </div>
  );
}
