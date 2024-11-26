const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes'); // Import your routes file

require('dotenv').config(); // Load environment variables from .env file

const app = express();

// CORS configuration to allow requests from specific origin
const corsOptions = {
    origin: 'http://localhost:3000', // Set your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Customize headers if necessary
};
app.use(cors(corsOptions)); // Apply the refined CORS settings

// Middleware
app.use(express.json()); // Parse JSON payloads

// API Routes
app.use('/api/products', productRoutes);

// Serve static files for uploaded images
app.use('/product-images', express.static(path.join(__dirname, 'public/product-images')));

// Serve static files for React frontend (production build)
const clientBuildPath = path.join(__dirname, 'client/build');
app.use(express.static(clientBuildPath));

// Fallback route to serve React frontend for unknown paths
// This should be after your API routes to ensure the API routes are handled first
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// MongoDB Connection
const PORT = process.env.PORT || 5000; // Default to 5000 if no port is set in .env

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the server only after a successful database connection
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the application if the DB connection fails
    });
