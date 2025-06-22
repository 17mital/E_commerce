const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth'); // if you want to use authentication

// ✅ COD Checkout Handler
router.post('/', auth, async (req, res) => {
  const { customer, cartItems, totalAmount, paymentMethod } = req.body;


  try {
    // 🔒 Example logic (not saving to DB for now)
    console.log("💰 New Order Received:");
    console.log("📦 Items:", cartItems);
    console.log("👤 Customer:", customer);
    console.log("💳 Payment:", paymentMethod);
    console.log("💵 Total:", totalAmount);


    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
