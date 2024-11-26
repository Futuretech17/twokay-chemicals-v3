const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product'); // Import Product model

// Ensure the 'product-images' folder exists
const uploadFolder = path.join(__dirname, '..', 'public', 'product-images');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Validate file type
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only! (jpeg, jpg, png, gif)'));
        }
    }
});

// Route to fetch all products with pagination and search functionality
router.get('/', async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query; // Default to page 1, limit 10 products

    try {
        const query = search ? { name: new RegExp(search, 'i') } : {}; // Case-insensitive search by name
        const products = await Product.find(query)
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            data: {
                products,
                total: totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: parseInt(page)
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Route to fetch "What's New" products (recently added, in-stock products)
router.get('/whats-new', async (req, res) => {
    try {
        const products = await Product.find({ inStock: true })
            .sort({ createdAt: -1 }) // Sort by newest
            .limit(5); // Adjust the limit as needed
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching new products:', error);
        res.status(500).json({ message: 'Error fetching new products', error: error.message });
    }
});

// Route to fetch "Trending" products (flagged as trending)
router.get('/trending', async (req, res) => {
    try {
        const products = await Product.find({ trending: true }).limit(5); // Adjust the limit as needed
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).json({ message: 'Error fetching trending products', error: error.message });
    }
});

// POST route to upload a new product with an image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Validate required fields
        const { name, category, title, description, size, price, inStock, trending } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required.' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        const newProduct = new Product({
            name,
            category,
            title: title || '',
            description: description || '',
            size: size ? size.split(',').map(size => size.trim()) : [],
            price: parseFloat(price) || 0,
            inStock: inStock === 'true', // Ensure inStock is a boolean
            trending: trending === 'true', // Ensure trending is a boolean
            image: `product-images/${req.file.filename}`
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Failed to save product', error: error.message });
    }
});

module.exports = router;
