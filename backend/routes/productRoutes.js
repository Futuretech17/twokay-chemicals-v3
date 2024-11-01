const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // Import Product model

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/product-images'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Route to fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST route to upload a new product with an image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Log the request body and uploaded file
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        // Validate required fields
        if (!req.body.name || !req.body.category) {
            return res.status(400).json({ message: 'Name and category are required.' });
        }

        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            title: req.body.title || undefined,
            description: req.body.description || undefined,
            size: req.body.size ? req.body.size.split(',').map(size => size.trim()) : [],
            price: req.body.price || undefined,
            image: `product-images/${req.file.filename}` // Store image path
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Failed to save product', error });
    }
});

module.exports = router;
