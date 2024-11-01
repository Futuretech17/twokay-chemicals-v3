import React from 'react';
import '../styles/ProductCategory.css'; // Import the CSS file
import surgicalSuppliesImage from '../assets/images/surgical-supplies.jpg'; // Correct image paths
import hospitalDisposablesImage from '../assets/images/hospital-disposables.jpg';
import pharmaProductsImage from '../assets/images/pharma-products.jpg';
import diagnosticsImage from '../assets/images/diagnostics.jpg';

const ProductCategories = () => {
    const categories = [
        { name: "Surgical Supplies", background: `url(${surgicalSuppliesImage})` },
        { name: "Hospital Disposables", background: `url(${hospitalDisposablesImage})` },
        { name: "Pharma Products", background: `url(${pharmaProductsImage})` },
        { name: "Diagnostics", background: `url(${diagnosticsImage})` }
    ];

    return (
        <section className="product-categories">
            <h2>Product Categories</h2>
            <div className="categories-container">
                {categories.map((category, index) => (
                    <div className="category-card" key={index} style={{ backgroundImage: category.background }}>
                        <h3>{category.name}</h3>
                        <button className="enquire-button">Enquire More</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductCategories;
