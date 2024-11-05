// components/FloatingParticle.js
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

export default function FloatingParticle({ position, color }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  // Interactive animation
  const { scale } = useSpring({
    scale: hovered ? 1.8 : 1.4,
    config: { tension: 180, friction: 12 },
  });

  // Movement and rotation
  useFrame(() => {
    if (mesh.current) {
      const dx = mouse.x * 3 - mesh.current.position.x;
      const dy = mouse.y * 3 - mesh.current.position.y;
      mesh.current.position.x += dx * 0.05;
      mesh.current.position.y += dy * 0.05;
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </animated.mesh>
  );
}
