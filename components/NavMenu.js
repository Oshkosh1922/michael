// components/NavMenu.js
import { motion } from 'framer-motion';
import { useState } from 'react';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10 }}>
      {/* Toggle Button */}
      <button onClick={toggleMenu} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '2rem', color: '#FFFFFF' }}
        >
          ☰
        </motion.div>
      </button>

      {/* Menu Links */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: '#333333',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            position: 'absolute',
            top: '40px',
            right: '0',
          }}
        >
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li><a href="#about" style={{ color: '#FFFFFF', textDecoration: 'none' }}>About</a></li>
            <li><a href="#projects" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Projects</a></li>
            <li><a href="#art" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Art</a></li>
            <li><a href="#contact" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default NavMenu;
