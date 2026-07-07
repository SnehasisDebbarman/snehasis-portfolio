import { useState, useEffect } from "react";
import Project from "./Project";
import scss from "../styles/Projects.module.scss";

// Import images directly for the floating preview
import img1 from "../assets/images/thumbnail-project-1-large.jpeg";
import img2 from "../assets/images/thumbnail-project-2-large.png";
import img3 from "../assets/images/thumbnail-project-3-large.jpeg";
import img4 from "../assets/images/thumbnail-project-4-large.jpeg";

const images = [img1, img2, img3, img4];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const projects = [
    {
      title: "Timberly — Furniture Marketplace",
      description: "A premium, high-intent e-commerce experience featuring smooth catalog interactions.",
      langs: "HTML CSS React",
      code: "https://github.com/SnehasisDebbarman/timberly",
      link: "https://timberly-74hw.vercel.app/"
    },
    {
      title: "Canvas Board — Collaborative Canvas",
      description: "A real-time, offline-first collaborative workspace with sub-16ms zoom/pan performance.",
      langs: "React TypeScript Next.js Yjs",
      code: "https://github.com/SnehasisDebbarman/canvas-board",
      link: "https://canvas-board-beige.vercel.app/"
    },
    {
      title: "Inna Construction Portal",
      description: "A robust civil management application for tracking materials and site progress.",
      langs: "HTML CSS React",
      code: "https://github.com/SnehasisDebbarman/inna",
      link: "https://inna-kolkata.netlify.app/"
    },
    {
      title: "Terminal Portfolio App",
      description: "An interactive command-line style developer portfolio built with React.",
      langs: "HTML CSS React",
      code: "https://github.com/SnehasisDebbarman/portfolio2",
      link: "https://snehasisdebbarman-terminal-portfolio.netlify.app/"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (hoveredIndex !== null) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredIndex]);

  return (
    <section id="projects" className={scss.projects}>
      <header className={scss.projects_header}>
        <h2>Projects</h2>
        <span className={scss.count}>{String(projects.length).padStart(2, "0")} works</span>
      </header>

      <div className={scss.projects_list}>
        {projects.map((project, index) => (
          <Project
            key={index}
            nr={index + 1}
            title={project.title}
            description={project.description}
            langs={project.langs}
            link={project.link}
            code={project.code}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* Floating Image Preview */}
      <div
        className={scss.floating_preview}
        style={{
          position: "fixed",
          top: mousePos.y,
          left: mousePos.x,
          opacity: hoveredIndex !== null ? 1 : 0,
          transform: hoveredIndex !== null 
            ? "translate(30px, -50%) scale(1)" 
            : "translate(15px, -50%) scale(0.9)",
          backgroundImage: hoveredIndex !== null ? `url(${images[hoveredIndex]})` : "none",
        }}
      />
    </section>
  );
}
