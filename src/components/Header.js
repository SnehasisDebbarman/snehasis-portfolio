import scss from "../styles/Header.module.scss";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
          >
            S. DEBBARMAN
          </ScrollLink>
        ) : (
          <Link to="/" style={{ cursor: "none" }} className={scss.logo}>
            S. DEBBARMAN
          </Link>
        )}
      </div>
      <nav className={scss.navigation}>
        {isHome ? (
          <>
            <ScrollLink to="about" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>ABOUT</ScrollLink>
            <ScrollLink to="skills" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>STACK</ScrollLink>
            <ScrollLink to="projects" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>PROJECTS</ScrollLink>
            <ScrollLink to="experience" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>EXPERIENCE</ScrollLink>
            <Link to="/blog" style={{ cursor: "none" }} className={scss.nav_link}>BLOG</Link>
            <ScrollLink to="contact" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>CONTACT</ScrollLink>
          </>
        ) : (
          <>
            <Link to="/#about" style={{ cursor: "none" }} className={scss.nav_link}>ABOUT</Link>
            <Link to="/#skills" style={{ cursor: "none" }} className={scss.nav_link}>STACK</Link>
            <Link to="/#projects" style={{ cursor: "none" }} className={scss.nav_link}>PROJECTS</Link>
            <Link to="/#experience" style={{ cursor: "none" }} className={scss.nav_link}>EXPERIENCE</Link>
            <Link to="/blog" style={{ cursor: "none" }} className={`${scss.nav_link} ${scss.active_link}`}>BLOG</Link>
            <Link to="/#contact" style={{ cursor: "none" }} className={scss.nav_link}>CONTACT</Link>
          </>
        )}
      </nav>
    </header>
  );
}
