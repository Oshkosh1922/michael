// components/GalleryCarousel.js
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './GalleryCarousel.module.css';
import FloatingTitle from './FloatingTitle'; // Import the animated title component

const images = [
  '/artwork/Untitled_Artwork.png',
  '/artwork/Untitled_Artwork 8.png',
  '/artwork/Untitled_Artwork 7.png',
  '/artwork/Untitled_Artwork 7 2.png',
  '/artwork/Untitled_Artwork 6.png',
  '/artwork/Untitled_Artwork 6 4.png',
  '/artwork/Untitled_Artwork 6 3.png',
  '/artwork/Untitled design 2.PNG',
];

export default function GalleryCarousel() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, src: '' });

  useEffect(() => {
    if (!isPaused) {
      const rotation = setInterval(() => setAngle((prev) => prev + 0.2), 16); // Adjust speed
      return () => clearInterval(rotation);
    }
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleDrag = (e) => {
    const movement = e.movementX || e.touches?.[0].clientX - e.touches?.[1]?.clientX || 0;
    setAngle((prev) => prev + movement * 0.1);
  };

  const handleImageClick = (src) => {
    setLightbox({ open: true, src });
  };

  return (
    <section className={styles.carouselContainer}>
      {/* Animated Title */}
      <FloatingTitle />

      {/* Carousel */}
      <div
        className={styles.carousel}
        ref={carouselRef}
        style={{ transform: `rotateY(${angle}deg)` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={(e) => e.preventDefault()} // Prevent drag ghosting
        onMouseMove={(e) => isPaused && handleDrag(e)}
        onTouchMove={(e) => isPaused && handleDrag(e)}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            onClick={() => handleImageClick(src)}
          >
            <Image
              src={src}
              alt={`Artwork ${index + 1}`}
              className={styles.image}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className={styles.lightbox} onClick={() => setLightbox({ open: false, src: '' })}>
          <Image
            src={lightbox.src}
            alt="Artwork"
            className={styles.lightboxImage}
            width={800}
            height={800}
          />
        </div>
      )}
    </section>
  );
}
