import { useState } from "react";
import scss from "../styles/Header.module.scss";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const closeMenu = () => setMenuOpen(false);

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
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{ cursor: "none" }}
      >
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <nav className={`${scss.navigation} ${menuOpen ? scss.menu_open : ""}`}>
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
      </nav>
    </header>
  );
}
