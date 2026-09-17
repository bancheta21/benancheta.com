import Image from "next/image";
import styles from "./projects-panel.module.css";

const projects = [
  {
    name: "Mako",
    href: "https://mako.trade",
    icon: "/mako-favicon.png",
    description: "A Fomo copytrading bot.",
  },
  {
    name: "Sprout",
    href: "https://usesprout.app",
    icon: "/sprout-favicon.png",
    description: "Agent-native digital asset management.",
  },
  {
    name: "Postscript",
    href: "https://usepostscript.com",
    icon: "/postscript-favicon.png",
    description: "An AI inbox.",
  },
];

export function ProjectsPanel() {
  return (
    <nav aria-label="Projects" className={styles.panel} tabIndex={0}>
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.href} className={styles.item}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.project}
            >
              <span className={styles.title}>
                <Image src={project.icon} alt="" width={28} height={28} className={styles.icon} />
                <span className={styles.name}>{project.name}</span>
              </span>
              <span className={styles.description}>{project.description}</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}