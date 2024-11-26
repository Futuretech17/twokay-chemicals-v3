const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); // Import your routes file

require('dotenv').config(); // Load environment variables from .env file

const app = express(); 

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON payloads

// API Routes
app.use('/api/products', productRoutes);

// Serve static files for uploaded images
app.use('/product-images', express.static(path.join(__dirname, 'public/product-images')));

// Serve static files for React frontend (production build)
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback route to serve React frontend for unknown paths
// This should be after your API routes to ensure the API routes are handled first
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// MongoDB Connection
const PORT = process.env.PORT || 5000; // Default to 5000 if no port is set in .env

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the server only after a successful database connection
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
