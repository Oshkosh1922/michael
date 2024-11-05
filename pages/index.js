import NavMenu from '../components/NavMenu';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import ProjectSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import GalleryCarousel from '../components/GalleryCarousel';
import SocialMediaSection from '../components/SocialMediaSection';

const sectionVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <NavMenu />
      
      <Hero />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #fde2e4 0%, #fad0c4 50%, #ffd1ff 100%)',
          padding: '4rem 2rem',
        }}
      >
        <motion.div
          className="sectionWrapper" // Apply spacing here
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          className="sectionWrapper" // Apply spacing here
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProjectSection />
        </motion.div>

        <motion.div
          className="sectionWrapper" // Apply spacing here
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <GalleryCarousel />
        </motion.div>

        <motion.div
          className="sectionWrapper" // Apply spacing here
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SocialMediaSection />
        </motion.div>

        <motion.div
          className="sectionWrapper" // Apply spacing here
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ContactSection />
        </motion.div>
      </motion.div>
    </div>
  );
}
