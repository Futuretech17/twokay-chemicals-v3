// src/components/HeroSection.js
import React, { useState, useEffect } from 'react';
import '../styles/HeroSection.css';

const HeroSection = ({ title, subtitle, backgroundImage }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Lazy load background image
  useEffect(() => {
    const image = new Image();
    image.src = backgroundImage;
    image.onload = () => setIsImageLoaded(true);
  }, [backgroundImage]);

  return (
    <div
      className={`hero-section ${isImageLoaded ? 'image-loaded' : ''}`}
      style={{
        backgroundImage: isImageLoaded ? `url(${backgroundImage})` : 'none', // Only set background once image is loaded
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;
