// src/components/HeroSection.js
import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image dynamically
    >
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;
