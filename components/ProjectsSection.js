// components/ProjectsSection.js
import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    title: 'Community Website for Blockchain Project',
    description: 'A website built to promote and support the Change Bitcoin Energy initiative on the Bitcoin blockchain.',
    github: 'https://github.com/Oshkosh1922/cbe',
    liveDemo: 'https://changebitcoin.energy',
  },
  {
    title: 'Visitor Check-In App',
    description: 'A web application for companies to streamline visitor check-ins with secure tracking and digital forms.',
    github: 'https://github.com/Oshkosh1922/vp',
  },
  {
    title: 'StoryBot Discord Bot',
    description: 'A Discord bot programmed to use various APIs for interactive storytelling and community engagement.',
    github: 'https://github.com/Oshkosh1922/StoryBot',
  },
];

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.title}>My Projects</h2>
      <div className={styles.bubblesContainer}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`${styles.projectBubble} ${expanded === index ? styles.expanded : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            onClick={() => handleToggle(index)}
            animate={{ scale: expanded === index ? 1.2 : 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 12 }}
          >
            <div className={styles.bubbleContent}>
              <h3>{project.title}</h3>
              {expanded === index && (
                <motion.div
                  className={styles.projectDetails}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>{project.description}</p>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.button}>
                    GitHub
                  </a>
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className={styles.button}>
                      Live Demo
                    </a>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
