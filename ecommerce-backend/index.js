const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const checkoutRoutes = require('./routes/checkout'); // ✅ Add this line
const paymentRoutes = require('./routes/payment');
const reviewRoutes = require('./routes/review');
const path = require('path');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/order');
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes); // ✅ Use the new route
app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/order', orderRoutes);
// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
