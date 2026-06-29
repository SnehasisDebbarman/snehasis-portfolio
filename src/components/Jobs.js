import Job from "./Job";
import scss from "../styles/Jobs.module.scss";

export default function Jobs() {
  const jobs = [
    {
      company: "Publicis Sapient",
      location: "Bengaluru, India",
      role: "Senior Experience Engineer",
      duration: "Apr 2025 – Present",
      achievements: [
        "Working on Carnival PLC project as a Frontend Developer.",
        "Built scalable interfaces using Next.js, Tailwind CSS, and Storybook.",
        "Contributed to Microfrontend architecture, enabling modular deployments.",
        "Integrated with Adobe Experience Manager (AEM) for dynamic content rendering.",
      ],
    },
    {
      company: "Unovators Tech",
      location: "Private Limited",
      role: "Associate Software Developer",
      duration: "2023 – 2025",
      achievements: [
        "Engineered a WebSocket-based real-time messaging system in React Native, boosting user engagement by 25%.",
        "Developed Philippines Central Bank's Excel to XML converter using React, Electron, and TypeScript.",
        "Implemented responsive UI with Tailwind CSS, achieving 40% faster response times.",
      ],
    },
    {
      company: "Fyllo / Agrihawk",
      location: "Bengaluru, India",
      role: "Member of Engineering — UI",
      duration: "2022 – 2023",
      achievements: [
        "Built data visualization components using React Native and Expo, increasing data-driven decisions by 25%.",
        "Architected support app and landing page using Next.js and Ionic, improving efficiency by 55%.",
        "Optimized performance, achieving a 20% increase in landing page conversion rates.",
      ],
    },
    {
      company: "ITC Infotech",
      location: "India Pvt. Ltd.",
      role: "Associate IT Consultant",
      duration: "2021 – 2022",
      achievements: [
        "Developed Honeywell's tracking software using React ecosystem, improving accuracy by 40%.",
        "Led dashboard redesign for ION Bank achieving 30% higher user engagement.",
      ],
    },
  ];

  return (
    <section id="experience" className={scss.jobs}>
      <div className={scss.jobs_header}>
        <span className={scss.label}>Work Experience</span>
        <span className={scss.count}>{String(jobs.length).padStart(2, "0")} roles</span>
      </div>
      <div className={scss.jobs_list}>
        {jobs.map((job, index) => (
          <Job
            key={index}
            nr={index + 1}
            company={job.company}
            location={job.location}
            role={job.role}
            duration={job.duration}
            achievements={job.achievements}
          />
        ))}
      </div>
    </section>
  );
}
