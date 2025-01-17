import scss from "../styles/Experience.module.scss";

export default function Experience() {
  const experience = [
    {
      field: "React",
      years: 4,
    },
    {
      field: "Javascript",
      years: 4,
    },
    {
      field: "HTML",
      years: 4,
    },
    {
      field: "CSS",
      years: 4,
    },
    {
      field: "NodeJS",
      years: 2,
    },
    {
      field: "Tailiwind",
      years: 3,
    },
  ];

  return (
    <section aria-label="experience" className={scss.experience}>
      {experience.map((exp, index) => (
        <div key={index}>
          <h1>{exp.field}</h1>
          <p>{exp.years} Years Experience</p>
        </div>
      ))}
    </section>
  );
}
