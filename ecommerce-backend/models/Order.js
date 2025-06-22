// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ must exist
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  customer: {
    name: String,
    address: String,
    phone: String,
    email: String
  },
  paymentMethod: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  isPaid: { type: Boolean, default: false },
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
