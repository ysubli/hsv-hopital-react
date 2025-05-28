import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: "/images/im1.jpg", alt: "Hôpital HSV - Entrée" },
    { src: "/images/im2.jpg", alt: "Hôpital HSV - Services" },
    { src: "/images/im3.jpg", alt: "Hôpital HSV - Équipe" }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={image.src} alt={image.alt} className="carousel-image" />
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={prevSlide}>
        &lt;
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
