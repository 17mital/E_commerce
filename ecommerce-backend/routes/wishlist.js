const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');  // ✅ destructure properly
const User = require('../models/User');

// ✅ Add product to wishlist
router.post('/:productId', auth, async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Only customers can use wishlist.' });
    }

    const user = await User.findById(req.user._id);
    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }

    res.json({ message: '✅ Added to wishlist' });
  } catch (err) {
    console.error("❌ Wishlist Add Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Remove product from wishlist
router.delete('/:productId', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: req.params.productId } },
      { new: true }
    );

    res.json({ message: '🗑️ Removed from wishlist' });
  } catch (err) {
    console.error("❌ Wishlist Remove Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get all wishlist products
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
    console.error("❌ Wishlist Fetch Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
