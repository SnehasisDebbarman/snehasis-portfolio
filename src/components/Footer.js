import LogoSocialMedia from "./LogoSocialMedia";
import scss from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={scss.footer}>
      <div>
        <LogoSocialMedia />
        <p>© {new Date().getFullYear()} Snehasis Debbarman</p>
      </div>
    </footer>
  );
}
