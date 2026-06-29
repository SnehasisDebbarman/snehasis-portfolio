import scss from "../styles/LogoSocialMedia.module.scss";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";

export default function LogoSocialMedia() {
  return (
    <div className={scss.social_media}>
      <a
        href="https://github.com/SnehasisDebbarman"
        target="_blank"
        rel="noreferrer"
        className={scss.github_container}
        aria-label="GitHub"
      >
        <FaGithub size={20} />
      </a>

      <a
        href="https://www.linkedin.com/in/snehasis-debbarman/"
        target="_blank"
        rel="noreferrer"
        className={scss.linkedin_container}
        aria-label="LinkedIn"
      >
        <FaLinkedinIn size={20} />
      </a>
      
      <a
        href="https://peerlist.io/snehasis"
        target="_blank"
        rel="noreferrer"
        className={scss.twitter_container}
        aria-label="Peerlist"
      >
        <SiPeerlist size={20} />
      </a>
    </div>
  );
}
