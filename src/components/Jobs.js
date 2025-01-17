import Job from "./Job";
import Link from "./UI/Link";
import scss from "../styles/Projects.module.scss";

export default function Jobs() {
  const jobs = [
    {
      company: "Unovators Tech Private Limited",
      role: "Associate Software Developer",
      duration: "2023-Present",
      achievements: [
        "Engineered a WebSocket-based real-time messaging system in React Native, boosting user engagement by 25%",
        "Developed Philippines Central Bank's Excel to XML converter using React, Electron, and TypeScript",
        "Implemented responsive UI with Tailwind CSS, achieving 40% faster response times",
      ],
    },
    {
      company: "Fyllo By Agrihawk Technologies Pvt. Ltd.",
      role: "Member of Engineering - UI Developer",
      duration: "Bengaluru, India",
      achievements: [
        "Built data visualization components using React Native and Expo, increasing data-driven decisions by 25%",
        "Architected support app and landing page using Next.js and Ionic, improving efficiency by 55%",
        "Optimized application performance leading to 20% increase in landing page conversion rates",
      ],
    },
    {
      company: "ITC Infotech India Pvt. Ltd.",
      role: "Associate IT Consultant",
      duration: "2021-2022",
      achievements: [
        "Developed Honeywell's tracking software using React ecosystem, improving accuracy by 40%",
        "Led dashboard redesign for ION Bank achieving 30% higher user engagement",
      ],
    }
  ];

  return (
    <section className={scss.projects}>
      <header>
        <h2>Experience</h2>
        <Link href="#contact">Contact me</Link>
      </header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {jobs.map((job, index) => (
          <Job
            key={index}
            nr={index + 1}
            company={job.company}
            role={job.role}
            duration={job.duration}
            achievements={job.achievements}
          />
        ))}
      </div>
    </section>
  );
}
