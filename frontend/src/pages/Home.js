// src/pages/home.js
import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar
import HeroSection from '../components/HeroSection';
import heroHomeImage from '../assets/images/hero-home.jpg'; // Adjust path as needed
import SellingPoints from '../components/SellingPoints'
import ProductCategories from '../components/ProductCategory';



const HomePage = () => {
  return (
    <>
      <Navbar /> {/* Include the Navbar here */}
      <HeroSection
        title="Welcome to Twokay Chemicals Ltd"
        subtitle="Your trusted partner in medical and pharmaceutical products."
        backgroundImage={heroHomeImage} // Pass the specific image
      />
       <SellingPoints />
       <ProductCategories />
      {/* Other page content goes here */}
    </>
  );
};

export default HomePage;
