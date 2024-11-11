// src/pages/about.js
import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
// import heroAboutImage from '../assets/images/hero-about.jpg'; // Adjust path as needed

const AboutPage = () => {
  return (
    <>
      <Navbar /> {/* Include the Navbar here */}
      <HeroSection
        title="About Us"
        subtitle="Learn more about Twokay Chemicals Ltd."
        // backgroundImage={heroAboutImage} // Pass the specific image
      />
      <Footer/>
      {/* Other page content goes here */}
    </>
  );
};

export default AboutPage;
