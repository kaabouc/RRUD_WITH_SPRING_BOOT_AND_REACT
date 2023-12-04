// ApiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/produit';

const ApiService = {
  fetchAllProducts: () => axios.get(`${API_BASE_URL}/all`),
  fetchProduct: (productId) => axios.get(`${API_BASE_URL}/get/${productId}`),
  addProduct: (product) => axios.post(`${API_BASE_URL}/save`, product),
  updateProduct: (productId, updatedProduct) => axios.put(`${API_BASE_URL}/update/${productId}`, updatedProduct),
  deleteProduct: (productId) => axios.delete(`${API_BASE_URL}/delete/${productId}`),
};

export default ApiService;
