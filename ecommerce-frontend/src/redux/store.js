import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});
