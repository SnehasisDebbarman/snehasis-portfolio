import { useState } from "react";
import { JsonIcon } from "../../components/icons";
import { ImportJsonUrlModal } from "../../components/modals/ImportJsonUrlModal";
import { JsonStatsModal } from "../../components/modals/JsonStatsModal";
import { useApp } from "../../store/useApp";
import Tools from "../../components/Toolbar/Tools";
import Shortcuts from "./Shortcuts";
import { Searchbar } from "../Searchbar";

export function Toolbar() {
  const [isImportModalOpen, setIsImportModal] = useState(false);
  const [isStatsModalOpen, setIsStatsModal] = useState(false);
  const schemaMode = useApp((state) => state.schemaMode);
  const toggleSchemaMode = useApp((state) => state.toggleSchemaMode);
  const openImportModal = () => setIsImportModal(true);
  const openStatsModal = () => setIsStatsModal(true);

  return (
    <div className="jt-toolbar">
      <Searchbar />

      <div className="jt-sep" />

      <button
        type="button"
        aria-label="Import JSON from URL"
        onClick={openImportModal}
        className="jt-btn jt-btn-import"
      >
        <span style={{ width: 15, height: 15, display: "flex", flexShrink: 0 }}>
          <JsonIcon />
        </span>
        <span>Import</span>
      </button>

      <button
        type="button"
        aria-label={schemaMode ? "Switch to data mode" : "Switch to schema mode"}
        onClick={() => void toggleSchemaMode()}
        className={`jt-btn ${schemaMode ? "jt-btn-active" : ""}`}
      >
        {schemaMode ? "Data" : "Schema"}
      </button>

      <button
        type="button"
        aria-label="Open JSON stats"
        onClick={openStatsModal}
        className="jt-btn"
      >
        Stats
      </button>

      <div className="jt-sep" />

      <Tools />

      <Shortcuts
        onOpenImportModal={openImportModal}
        onOpenStatsModal={openStatsModal}
        onToggleSchemaMode={() => void toggleSchemaMode()}
      />
      <ImportJsonUrlModal
        isOpen={isImportModalOpen}
        setOpen={setIsImportModal}
      />
      <JsonStatsModal isOpen={isStatsModalOpen} setOpen={setIsStatsModal} />
    </div>
  );
}
