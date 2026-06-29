import scss from "../styles/Job.module.scss";

function Job({ company, location, role, duration, achievements }) {
  return (
    <div className={scss.job_card}>
      <div className={scss.left_col}>
        <span className={scss.duration}>{duration}</span>
        {location && <span className={scss.location}>{location}</span>}
      </div>
      <div className={scss.right_col}>
        <div className={scss.job_header}>
          <h3 className={scss.company}>{company}</h3>
          <p className={scss.role}>{role}</p>
        </div>
        <ul className={scss.achievements}>
          {achievements.map((achievement, i) => (
            <li key={i} className={scss.achievement_item}>
              <span className={scss.bullet}>▹</span>
              <p className={scss.achievement_text}>{achievement}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Job;
