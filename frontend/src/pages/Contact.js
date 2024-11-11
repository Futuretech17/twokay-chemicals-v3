// src/pages/contact.js
import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
// import heroContactImage from '../assets/images/hero-contact.jpg'; // Adjust path as needed

const ContactPage = () => {
  return (
    <>
      <Navbar /> {/* Include the Navbar here */}
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with Twokay Chemicals Ltd."
        // backgroundImage={heroContactImage} // Pass the specific image
      />
      <Footer/>
      {/* Other page content goes here */}
    </>
  );
};

export default ContactPage;
