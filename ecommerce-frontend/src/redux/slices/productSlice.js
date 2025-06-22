// redux/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const item = state.cart.find(i => i._id === action.payload._id);
      if (item) {
        item.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },
    incrementQty: (state, action) => {
      const item = state.cart.find(i => i._id === action.payload);
      if (item) item.qty += 1;
    },
    decrementQty: (state, action) => {
      const item = state.cart.find(i => i._id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(i => i._id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const {
  setProducts,
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart
} = productSlice.actions;

export default productSlice.reducer;
