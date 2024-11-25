const mongoose = require('mongoose');

// MongoDB Atlas connection string
const atlasURI = 'mongodb+srv://Benjie:37430987@cluster0.t2cbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Local MongoDB connection string
const localURI = 'mongodb://127.0.0.1:27017/myLocalDB';  // Replace 'myLocalDB' with the local database name

// MongoDB schema for products (with 'price' as a string)
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String  // Change price field to String to store values like '450 per doz'
});

const Product = mongoose.model('Product', productSchema);

// Function to sync data from Atlas to Local MongoDB
async function syncData() {
  try {
    // Connect to MongoDB Atlas first
    await mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');

    // Fetch data from MongoDB Atlas
    const products = await Product.find();  // Fetch products from Atlas

    // Disconnect from the Atlas database before connecting to the local database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');

    // Connect to the local MongoDB database
    await mongoose.connect(localURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Local MongoDB');

    // Insert data into the local MongoDB database
    await Product.insertMany(products);
    console.log('Data synced to Local MongoDB');
    
    // Disconnect from the local database
    await mongoose.disconnect();
    console.log('Disconnected from Local MongoDB');
  } catch (err) {
    console.error('Error syncing data:', err);
  }
}

syncData();
