import axios from 'axios';

const API = axios.create({ baseURL: '/api' }); // ✅ Relative URL


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);

export const fetchAllProducts = () => API.get('/products');
export const fetchMyProducts = () => API.get('/products/mine');
export const addProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const addToWishlist = (productId) => API.post(`/wishlist/${productId}`);
export const removeFromWishlist = (productId) => API.delete(`/wishlist/${productId}`);
export const fetchMyOrders = () => API.get('/order/my-orders');
export default API;