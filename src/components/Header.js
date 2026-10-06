import { useEffect, useRef, useState } from "react";
import scss from "../styles/Header.module.scss";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const tools = [
  { label: "JSON Tree Viewer", path: "/json-tree" },
  { label: "JavaScript Compiler", path: "/compiler" },
  { label: "Markdown Editor & Viewer", path: "/markdown" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsContainer = useRef();
  const toolsButton = useRef();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const closeMenu = () => {
    setMenuOpen(false);
    setToolsOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!toolsOpen) return;
    const outside = event => {
      if (!toolsContainer.current?.contains(event.target)) setToolsOpen(false);
    };
    const escape = event => {
      if (event.key === "Escape") {
        setToolsOpen(false);
        toolsButton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [toolsOpen]);

  return (
    <header className={scss.header}>
      <div className={scss.logo_area}>
        {isHome ? (
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            style={{ cursor: "none" }}
            className={scss.logo}
            onClick={closeMenu}
          >
            S. DEBBARMAN
          </ScrollLink>
        ) : (
          <Link to="/" style={{ cursor: "none" }} className={scss.logo} onClick={closeMenu}>
            S. DEBBARMAN
          </Link>
        )}
      </div>

      <button
        className={scss.menu_toggle}
        onClick={() => { setMenuOpen(!menuOpen); setToolsOpen(false); }}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="portfolio-navigation"
        style={{ cursor: "none" }}
      >
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <nav id="portfolio-navigation" aria-label="Main navigation" className={`${scss.navigation} ${menuOpen ? scss.menu_open : ""}`}>
        {isHome ? (
          <>
            <ScrollLink to="about" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>ABOUT</ScrollLink>
            <ScrollLink to="skills" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>STACK</ScrollLink>
            <ScrollLink to="projects" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>PROJECTS</ScrollLink>
            <ScrollLink to="experience" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>EXPERIENCE</ScrollLink>
            <Link to="/blog" style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>BLOG</Link>
            <ScrollLink to="contact" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>CONTACT</ScrollLink>
          </>
        ) : (
          <>
            <Link to="/#about" style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>ABOUT</Link>
            <Link to="/#skills" style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>STACK</Link>
            <Link to="/#projects" style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>PROJECTS</Link>
            <Link to="/#experience" style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>EXPERIENCE</Link>
            <Link to="/blog" style={{ cursor: "none" }} className={`${scss.nav_link} ${scss.active_link}`} onClick={closeMenu}>BLOG</Link>
            <Link to="/#contact" style={{ cursor: "none" }} className={scss.nav_link} onClick={closeMenu}>CONTACT</Link>
          </>
        )}
        <div className={scss.tools} ref={toolsContainer} onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setToolsOpen(false);
        }}>
          <button type="button" ref={toolsButton} className={`${scss.nav_link} ${scss.tools_toggle}`}
            aria-expanded={toolsOpen} aria-controls="portfolio-tools" onClick={() => setToolsOpen(!toolsOpen)}>
            TOOLS <FiChevronDown aria-hidden="true" className={toolsOpen ? scss.chevron_open : ""} />
          </button>
          <ul id="portfolio-tools" className={scss.tools_dropdown} hidden={!toolsOpen}>
            {tools.map(tool => <li key={tool.path}>
              <Link to={tool.path} onClick={closeMenu}>{tool.label}</Link>
            </li>)}
          </ul>
        </div>
      </nav>
    </header>
  );
}
