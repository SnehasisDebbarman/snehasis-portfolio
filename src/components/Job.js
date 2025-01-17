import Link from "./UI/Link";
import scss from "../styles/Project.module.scss";

function Job({ nr, company, role, duration, achievements }) {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <h3 className={scss.title}>
          {company} - {role}
        </h3>
        <p className={scss.duration}>{duration}</p>
        <ul className={scss.achievements}>
          {achievements.map((achievement, i) => (
            <li key={i}>{achievement}</li>
          ))}
        </ul>
      </div>
      <div className={scss.view}>
        <Link href="#">View project</Link>
        <Link href="#">View code</Link>
      </div>
    </div>
  );
}

export default Job;
