const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, authorize } = require('../middlewares/auth'); // updated import
const mongoose = require('mongoose');

// 1️⃣ Add product – only shopkeepers
router.post('/', auth, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      shopkeeperId: req.user._id  // ✅ REQUIRED for schema validation
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});


// 2️⃣ Get all available products (customer/home page)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 3️⃣ Get product by ID


// 4️⃣ Get logged-in shopkeeper's own products


// 👇 Secure route: Get products for logged-in shopkeeper
router.get('/mine', auth, async (req, res) => {
  try {
    console.log("🔎 Fetching products for shopkeeper ID:", req.user._id);

    const products = await Product.find({ shopkeeperId: req.user._id });

    console.log("✅ Products found:", products.length);
    res.json(products);
  } catch (err) {
    console.error("❌ Error in /products/mine route:", err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('shopkeeperId', 'email name'); // ⬅️ include shopkeeper name/email

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// 5️⃣ Update product (only shopkeeper who created it)
router.put('/:id', auth, authorize('shopkeeper'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (String(product.shopkeeperId) !== String(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 6️⃣ Delete product (only shopkeeper who created it)
router.delete('/:id', auth, authorize('shopkeeper'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (String(product.shopkeeperId) !== String(req.user._id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
