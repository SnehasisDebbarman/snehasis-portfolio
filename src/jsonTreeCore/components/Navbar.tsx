import { LogoIcon } from "../components/icons";
import { Toolbar } from "../components/Toolbar/Toolbar";

export default function Navbar() {
  return (
    <header className="jt-navbar">
      <div className="jt-logo">
        <div className="jt-logo-icon">
          <LogoIcon />
        </div>
        <span className="jt-logo-text">JsonTree</span>
      </div>
      <Toolbar />
    </header>
  );
}
