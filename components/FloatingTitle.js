import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './GalleryCarousel.module.css';

const FloatingTitle = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <div ref={titleRef} className={styles.floatingTitleContainer}>
      {/* "My Art" - First line */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className={styles.titleLine}
      >
        <motion.span
          className={styles.highlightWord}
          initial={{ color: 'transparent', WebkitTextStroke: '1px #333' }}
          animate={isInView ? { color: '#4a76a8', WebkitTextStroke: '0px' } : {}}
          transition={{ duration: 3 }} // Slower fill for "My"
        >
          My
        </motion.span>{" "}
        Art
      </motion.h2>

      {/* "my mind poured onto a digital canvas" - Second line */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className={styles.titleLine}
      >
        <span>my </span>
        <motion.span
          className={styles.highlightWord}
          initial={{ color: 'transparent', WebkitTextStroke: '1px #333' }}
          animate={isInView ? { color: '#4a76a8', WebkitTextStroke: '0px' } : {}}
          transition={{ duration: 3 }} // Slower fill for "Mind"
        >
          mind
        </motion.span>{" "}
        poured onto a digital canvas
      </motion.h2>
    </div>
  );
};

export default FloatingTitle;
