const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: false }, // optional
    description: { type: String, required: false }, // optional
    size: { type: [String], required: false }, // optional, array of sizes
    price: { type: String, required: false }, // optional
    image: { type: String, required: true } // required
});

module.exports = mongoose.model('Product', productSchema);
