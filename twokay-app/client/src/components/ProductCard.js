import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaWhatsapp, FaEye } from 'react-icons/fa'; // Import the icons
import '../styles/ProductCard.css';

// Update to dynamically use the base URL for images and API calls
const ProductCardMain = ({ product }) => {
  // Get the base URL dynamically (can be from environment variable or config file)
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';  // Default to local if not set

  return (
    <div className="product-card-main">
      <div className="product-image-container-main">
        {/* Use dynamic base URL for images */}
        <img
          src={`${API_BASE_URL}/${product.image}`}  // Update the image source URL
          alt={product.name}
          className="product-image-main"
        />
        {/* View Details icon */}
        <Link to={`/products/${product._id}`} state={{ product: product }} className="view-details-icon-main">
          <FaEye className="view-details-icon-img-main" />
        </Link>
      </div>

      <div className="product-info-main">
        <h3 className="product-name-main">{product.name}</h3>
        <p className="product-category-main">{product.category}</p>
        <p className="product-description-main">{product.description}</p>

        {/* WhatsApp Icon and Link */}
        <a
          href={`https://wa.me/254714687727?text=I'm%20interested%20in%20${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-enquiry-main"
        >
          <FaWhatsapp className="whatsapp-icon-main" /> Enquire More
        </a>
      </div>
    </div>
  );
};

export default ProductCardMain;
