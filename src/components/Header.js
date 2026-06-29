import scss from "../styles/Header.module.scss";
import { Link as ScrollLink } from "react-scroll";

export default function Header() {
  return (
    <header className={scss.header}>
      <div className={scss.logo_area}>
        <ScrollLink to="about" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.logo}>
          S. DEBBARMAN
        </ScrollLink>
      </div>
      <nav className={scss.navigation}>
        <ScrollLink to="about" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>ABOUT</ScrollLink>
        <ScrollLink to="skills" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>STACK</ScrollLink>
        <ScrollLink to="projects" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>PROJECTS</ScrollLink>
        <ScrollLink to="experience" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>EXPERIENCE</ScrollLink>
        <ScrollLink to="contact" smooth={true} duration={500} style={{ cursor: "none" }} className={scss.nav_link}>CONTACT</ScrollLink>
      </nav>
    </header>
  );
}
