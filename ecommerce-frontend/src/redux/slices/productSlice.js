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
    }
  }
});
export const { setProducts, addToCart } = productSlice.actions;
export default productSlice.reducer;