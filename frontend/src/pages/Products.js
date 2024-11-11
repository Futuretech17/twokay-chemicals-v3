// src/pages/products.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar'; // Import the Navbar
import Footer from '../components/Footer';
// import heroProductsImage from '../assets/images/hero-products.jpg'; // Adjust path as needed

const ProductsPage = () => {
  return (
    <>
      <Navbar /> {/* Include the Navbar here */}
      <HeroSection
        title="Our Products"
        subtitle="Explore a wide range of medical and pharmaceutical supplies."
        // backgroundImage={heroProductsImage} // Pass the specific image
      />
      <Footer />
      {/* Other page content goes here */}
    </>
  );
};

export default ProductsPage;
