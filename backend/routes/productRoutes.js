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
        cb(null, uploadFolder); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Route to fetch all products with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 products per page

    try {
        // Fetch paginated products
        const products = await Product.find()
            .skip((page - 1) * limit) // Skip products from previous pages
            .limit(parseInt(limit)) // Limit the number of products to the requested page
            .exec();

        // Get the total count of products for pagination
        const totalProducts = await Product.countDocuments();

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit), // Calculate the total pages
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Route to fetch what's new
router.get('/whats-new', async (req, res) => {
    try {
        const products = await Product.find({ inStock: true })
                                      .sort({ createdAt: -1 })  // Sort by newest products
                                      .limit(5);  // Adjust the number of products to display
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching new products', error });
    }
});

// Route to fetch trending products
router.get('/trending', async (req, res) => {
    try {
        const products = await Product.find({ trending: true })
                                      .limit(5);  // Adjust the number of products to display
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trending products', error });
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
