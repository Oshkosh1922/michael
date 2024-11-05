import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from './AboutSection.module.css';

const cardData = [
  { title: 'Hobbies', text: 'Running, Art, Family, Education' },
  { title: 'Experience', text: 'Production Engineer, Managerial, Community Lead, Social Media' },
  { title: 'Design', text: 'Everything from Adobe products to drawing digital art by hand in Procreate' },
];

export default function AboutSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <section className={styles.aboutSection}>
      <motion.h2
        className={styles.title}
        style={{ x, y, rotateX, rotateY }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.2}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        About Me
      </motion.h2>

      <div className={styles.cardContainer}>
        {cardData.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <h3>{card.title}</h3>
              </div>
              <div className={styles.cardBack}>
                <p>{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
