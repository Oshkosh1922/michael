// components/SocialMediaSection.js
import React, { useEffect } from 'react';
import styles from './SocialMediaSection.module.css';
import { motion } from 'framer-motion';

export default function SocialMediaSection() {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <section className={styles.socialMediaSection}>
      <motion.div
        className={styles.feedContainer}
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Connect with Me
        </motion.h2>

        <motion.div
          className={styles.twitterFeedWrapper}
          whileHover={{ scale: 1.02, rotateY: 3 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <a
            className="twitter-timeline"
            data-width="400"
            data-height="600"
            data-theme="light"
            href="https://twitter.com/___swm" // Replace with your actual Twitter handle
          >
            Tweets by @___swm
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
