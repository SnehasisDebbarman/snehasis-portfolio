import scss from "../styles/Experience.module.scss";
import { 
  SiJavascript, 
  SiTypescript, 
  SiGraphql, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiStorybook, 
  SiNodedotjs, 
  SiGit, 
  SiGithub 
} from "react-icons/si";
import { FaNetworkWired, FaHtml5, FaCss3Alt } from "react-icons/fa";

const stackItems = [
  // Row 1: Languages & Core
  {
    title: "JavaScript",
    detail: "(ES6+, Async, Engines)",
    icon: <SiJavascript size={36} color="#F7DF1E" />,
  },
  {
    title: "TypeScript",
    detail: "(Strong typing, Generics)",
    icon: <SiTypescript size={36} color="#3178C6" />,
  },
  {
    title: "HTML / CSS",
    detail: "(Semantic, Responsive, SCSS)",
    icon: (
      <div style={{ display: "flex", gap: "8px" }}>
        <FaHtml5 size={28} color="#E34F26" />
        <FaCss3Alt size={28} color="#1572B6" />
      </div>
    ),
  },
  {
    title: "GraphQL",
    detail: "(Queries, Mutations, Schema)",
    icon: <SiGraphql size={36} color="#E10098" />,
  },

  // Row 2: Frameworks & Libs
  {
    title: "React / Next.js",
    detail: "(SSR, SSG, State)",
    icon: (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <SiReact size={28} color="#61DAFB" />
        <SiNextdotjs size={28} color="#ffffff" />
      </div>
    ),
  },
  {
    title: "React Native",
    detail: "(iOS, Android, Expo)",
    icon: <SiReact size={36} color="#61DAFB" />,
  },
  {
    title: "Tailwind CSS",
    detail: "(Utility-first responsive styling)",
    icon: <SiTailwindcss size={36} color="#38BDF8" />,
  },
  {
    title: "Storybook",
    detail: "(Component Driven Dev)",
    icon: <SiStorybook size={36} color="#FF4785" />,
  },

  // Row 3: Architecture & Enterprise
  {
    title: "Microfrontends",
    detail: "(Module Federation, Scale)",
    icon: <FaNetworkWired size={36} color="#E29C34" />,
  },
  {
    title: "AEM / CMS",
    detail: "(Adobe Experience Manager, Headless)",
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" fill="#FF0000">
        <path d="M14.6 3l9.4 18h-4.8l-3-6h-8.4l-3 6h-4.8l9.4-18h5.2zm-2.6 4.3l-2.8 5.7h5.6l-2.8-5.7z" />
      </svg>
    ),
  },
  {
    title: "Node.js",
    detail: "(Runtime, Express, APIs)",
    icon: <SiNodedotjs size={36} color="#339933" />,
  },
  {
    title: "Git / CI-CD",
    detail: "(GitHub Actions, Vercel)",
    icon: (
      <div style={{ display: "flex", gap: "8px" }}>
        <SiGit size={28} color="#F05032" />
        <SiGithub size={28} color="#ffffff" />
      </div>
    ),
  },
];

export default function Experience() {
  return (
    <section id="skills" className={scss.experience}>
      <div className={scss.grid}>
        {stackItems.map((item, index) => (
          <div key={index} className={scss.skill_cell}>
            <div className={scss.icon_container}>{item.icon}</div>
            <span className={scss.skill_label}>{item.title}</span>
            <span className={scss.skill_detail}>{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
