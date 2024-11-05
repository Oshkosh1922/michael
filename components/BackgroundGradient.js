import { useRef, useEffect } from 'react';

export default function BackgroundGradient() {
  const ref = useRef();

  useEffect(() => {
    let animationFrameId;

    // Function to animate the background gradient
    const animateGradient = () => {
      const time = Date.now() / 1000; // Convert milliseconds to seconds
      const color1 = `hsl(${200 + time * 10}, 50%, 85%)`;
      const color2 = `hsl(${260 + time * 10}, 70%, 90%)`;
      if (ref.current) {
        ref.current.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
      }
      animationFrameId = requestAnimationFrame(animateGradient);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(animateGradient);

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        transition: 'background 0.5s ease',
      }}
    />
  );
}
