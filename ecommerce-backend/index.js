const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*', // You can restrict to frontend origin if needed
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const checkoutRoutes = require('./routes/checkout');
const paymentRoutes = require('./routes/payment');
const reviewRoutes = require('./routes/review');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/order');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/order', orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 👉 Serve frontend static files (e.g., Vite)
const frontendPath = path.resolve(__dirname, '../ecommerce-frontend/build');
app.use(express.static(frontendPath));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});



// ✅ Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
