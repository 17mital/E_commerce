const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// POST review with optional image
router.post('/:productId', auth, upload.single('image'), async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const image = req.file ? `/uploads/reviews/${req.file.filename}` : null;

    const review = new Review({
      product: req.params.productId,
      user: req.user._id,
      comment,
      rating,
      image
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('❌ Error posting review:', err);
    res.status(500).json({ error: 'Failed to post review' });
  }
});

// GET reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
