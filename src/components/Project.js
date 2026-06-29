import scss from "../styles/Project.module.scss";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

function Project({ nr, title, description, langs, code, link, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={scss.project_wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={scss.left_section}>
        <span className={scss.number}>{String(nr).padStart(2, "0")}</span>
        <div className={scss.title_group}>
          <h3 className={scss.title}>
            <a href={link} target="_blank" rel="noreferrer" className={scss.title_link}>
              {title}
            </a>
          </h3>
          <p className={scss.description}>{description}</p>
        </div>
      </div>

      <div className={scss.right_section}>
        <div className={scss.langs}>
          {langs.split(" ").map((lang, i) => (
            <span className={scss.lang} key={i}>
              {lang}
            </span>
          ))}
        </div>

        <div className={scss.actions}>
          <a href={link} target="_blank" rel="noreferrer" className={scss.action_link}>
            LIVE <FiArrowUpRight className={scss.arrow} />
          </a>
          <a href={code} target="_blank" rel="noreferrer" className={scss.action_link}>
            CODE <FaGithub className={scss.github} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Project;
