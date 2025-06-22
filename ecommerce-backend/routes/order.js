// routes/order.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order (used in CheckoutPage)
router.post('/checkout', auth, async (req, res) => {
  try {
    const { customer, cartItems, paymentMethod, totalAmount } = req.body;
    const order = new Order({
      customer,
      paymentMethod,
      products: cartItems.map(i => ({ productId: i._id, quantity: i.qty })),
      amount: totalAmount,
      isPaid: paymentMethod === 'Online',
      user: req.user._id,       // LINK this order to the logged-in user
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Order Creation Error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Fetch orders for the logged-in customer:
router.get('/my-orders', auth, async (req, res) => {
  try {
    console.log("📥 Getting orders for:", req.user.email); // ✅ Add this
    const orders = await Order.find({ user: req.user._id })
      .populate('products.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Fetch Orders Error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


module.exports = router;
