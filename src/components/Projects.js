import Project from "./Project";
import Link from "./UI/Link";

import scss from "../styles/Projects.module.scss";

export default function Projects() {
  const projects = [
    {
      title: "Timberly - Furniture marketplace",
      langs: "HTML CSS React",
      code:"https://github.com/SnehasisDebbarman/timberly",
      link:"https://timberly-74hw.vercel.app/"
    },
    {
      title: "rimes",
      langs: "HTML CSS React",
      code:"https://github.com/SnehasisDebbarman/rimes",
      link:'https://rimes-yr38.vercel.app/'
    },
    {
      title: "Inna construction Application",
      langs: "HTML CSS React",
      code :"https://github.com/SnehasisDebbarman/inna",
      link: "https://inna-kolkata.netlify.app/"
    },
    {
      title: "Terminal Portfolio Application",
      langs: "HTML CSS React",
      code:"https://github.com/SnehasisDebbarman/portfolio2",
      link: "https://snehasisdebbarman-terminal-portfolio.netlify.app/"
    }
  ];
  return (
    <section className={scss.projects}>
      <header>
        <h2>Projects</h2>
        <Link href="#contact">Contact me</Link>
      </header>
      <div>
        {projects.map((project, index) => (

          <Project
            key={index}
            nr={index + 1}
            title={project.title}
            langs={project.langs}
            link={project.link}
            code={project.code}

            />

        ))}
      </div>
    </section>
  );
}
