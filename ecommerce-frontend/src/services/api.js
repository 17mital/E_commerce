import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = () => API.get('/products');
export const loginUser = (data) => API.post('/auth/login', data);

export default API;