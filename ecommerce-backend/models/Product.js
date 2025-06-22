const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: { type: String },         // ✅ Must be added
  address: { type: String },       // ✅ Must be added
  inStock: { type: Boolean, default: true }, // ✅ Must be added
  available: { type: Boolean, default: true },
  shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', productSchema); // ✅ must export like this