import scss from "../styles/Introduction.module.scss";
import profileDesktop from "../assets/images/image-profile-desktop.jpeg";
import profileMobile from "../assets/images/image-profile-mobile.jpeg";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";

export default function Introduction() {
  return (
    <section id="about" className={scss.introduction}>
      <div className={scss.hero_container}>
        {/* Left Column */}
        <div className={scss.left_column}>
          <div className={scss.tagline_wrapper}>
            <span className={scss.tagline_dash}>—</span>
            <p className={scss.tagline}>
              Crafting high-intent, scalable, and beautifully animated frontend architectures.
            </p>
          </div>

          <h1 className={scss.name_title}>
            Snehasis <br />
            <span>Debbarman</span>
          </h1>

          <div className={scss.meta_grid}>
            <div className={scss.meta_item}>
              <span className={scss.meta_label}>ROLE</span>
              <span className={scss.meta_value}>Senior Experience Engineer</span>
            </div>
            <div className={scss.meta_item}>
              <span className={scss.meta_label}>COMPANY</span>
              <span className={scss.meta_value}>Publicis Sapient</span>
              <span className={scss.meta_sub}>Apr 2025 – Present</span>
            </div>
          </div>

          <div className={scss.actions_row}>
            <div className={scss.social_circles}>
              <a href="mailto:snehasisdebbarman9@gmail.com" className={scss.circle_btn} aria-label="Email">
                <FaEnvelope size={18} />
              </a>
              <a href="https://github.com/SnehasisDebbarman" target="_blank" rel="noreferrer" className={scss.circle_btn} aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/snehasis-debbarman/" target="_blank" rel="noreferrer" className={scss.circle_btn} aria-label="LinkedIn">
                <FaLinkedinIn size={18} />
              </a>
              <a href="https://peerlist.io/snehasis" target="_blank" rel="noreferrer" className={scss.circle_btn} aria-label="Peerlist">
                <SiPeerlist size={18} />
              </a>
            </div>

            <a href="/resume.pdf" target="_blank" rel="noreferrer" className={scss.resume_btn}>
              DOWNLOAD RESUME
            </a>
          </div>

          <div className={scss.status_badge}>
            <span className={scss.pulse_dot}></span>
            <span className={scss.status_text}>OPTIMISING: SCALABILITY • STORYBOOK • MICROFRONTENDS</span>
          </div>
        </div>

        {/* Right Column */}
        <div className={scss.right_column}>
          <div className={scss.image_wrapper}>
            <picture>
              <source media="(min-width: 768px)" srcSet={profileDesktop} />
              <img src={profileMobile} alt="Snehasis Debbarman" className={scss.profile_img} />
            </picture>
          </div>
          <div className={scss.image_caption}>
            <span className={scss.caption_primary}>SR. EXPERIENCE ENGINEER - BENGALURU, INDIA</span>
            <span className={scss.caption_secondary}>NEXT.JS • REACT • TYPESCRIPT • TAILWIND • STORYBOOK • AEM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
