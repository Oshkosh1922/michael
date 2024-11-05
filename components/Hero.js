import { Canvas, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { useSpring, animated as a } from '@react-spring/three';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const messages = [
  "Breathe in peace.",
  "Embrace the present.",
  "Cherish simple moments.",
  "Radiate calmness.",
  "Let go and flow.",
  "You are enough.",
  "Find joy in stillness.",
  "Appreciate this moment.",
  "Peace is within.",
  "Life unfolds beautifully."
];

function FloatingParticle({ position, color, delay, size, onParticleClick }) {
  const mesh = useRef();
  const [pressed, setPressed] = useState(false);

  const { scale } = useSpring({
    scale: pressed ? [1.3, 1.3, 1.3] : [size, size, size],
    config: { mass: 1, tension: 300, friction: 12 },
  });

  const { posX, posY, rotationZ } = useSpring({
    from: { posX: position[0], posY: position[1], rotationZ: 0 },
    to: async (next) => {
      while (true) {
        await next({
          posX: position[0] + (Math.random() - 0.5) * 1.5,
          posY: position[1] + (Math.random() - 0.5) * 1.5,
          rotationZ: Math.random() * Math.PI,
        });
        await next({
          posX: position[0] - (Math.random() - 0.5) * 1.5,
          posY: position[1] - (Math.random() - 0.5) * 1.5,
          rotationZ: -Math.random() * Math.PI,
        });
      }
    },
    config: { duration: 2500 },
    delay,
  });

  const handleClick = () => {
    setPressed((prev) => !prev);
    onParticleClick(mesh.current);
  };

  return (
    <a.mesh
      ref={mesh}
      position-x={posX}
      position-y={posY}
      rotation-z={rotationZ}
      scale={scale}
      onPointerOver={() => setPressed(true)}
      onPointerOut={() => setPressed(false)}
      onClick={handleClick}
      castShadow
    >
      <sphereGeometry args={[0.4, 32, 32]} />
      <a.meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.4}
        roughness={0.2}
      />
    </a.mesh>
  );
}

function ParticleScene({ onParticleClick }) {
  const particleColors = ['#84d6e8', '#b4e4f8', '#d6bbf7', '#f7e4bb', '#f4a7d7'];
  const camera = useThree((state) => state.camera);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-2, -2, 5]} intensity={0.7} />

      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingParticle
          key={i}
          position={[Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * -1]}
          color={particleColors[i % particleColors.length]}
          size={Math.random() * 0.6 + 0.5}
          delay={i * 400}
          onParticleClick={(mesh) => onParticleClick(mesh, camera)}
        />
      ))}
    </>
  );
}

function BackgroundGradient() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        background: 'linear-gradient(135deg, #fde2e4 0%, #fad0c4 50%, #ffd1ff 100%)',
        transition: 'background 1s ease',
      }}
    />
  );
}

export default function Hero() {
  const [message, setMessage] = useState(null);
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const handleParticleClick = (mesh, camera) => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);

    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(mesh.matrixWorld);
    vector.project(camera);
    const x = (0.5 + vector.x / 2) * window.innerWidth;
    const y = (0.5 - vector.y / 2) * window.innerHeight;
    setScreenPosition({ x, y });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <BackgroundGradient />

      {isClient && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <ParticleScene onParticleClick={handleParticleClick} />
        </Canvas>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#ffffff',
          zIndex: 1,
        }}
      >
        <h1 style={{ fontSize: 'calc(2.5rem + 2vw)', margin: 0, textShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
          Welcome to Michael&apos;s Portfolio
        </h1>
        <p style={{ fontSize: 'calc(1rem + 1vw)', marginTop: '10px', maxWidth: '600px', textShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
          Your gateway to creativity and code
        </p>
      </motion.div>

      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1.05 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: screenPosition.x,
              top: screenPosition.y,
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(8px)',
              padding: '15px 25px',
              borderRadius: '12px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              fontSize: '1rem',
              color: '#333',
              zIndex: 2,
              border: '1px solid rgba(255, 255, 255, 0.4)',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
