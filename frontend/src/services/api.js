import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

const apiService = {
    // Function to get all products
    getProducts: async () => {
        const response = await API.get('/products');
        return response.data;
    },
    
    // Function to get a single product by ID
    getProductById: async (id) => {
        const response = await API.get(`/products/${id}`);
        return response.data;
    },
    
    // Function to add a new product
    addProduct: async (productData) => {
        const response = await API.post('/products', productData);
        return response.data;
    },
    
    // Function to delete a product by ID
    deleteProduct: async (id) => {
        const response = await API.delete(`/products/${id}`);
        return response.data;
    },
    
    // Function to update a product by ID
    updateProduct: async (id, productData) => {
        const response = await API.put(`/products/${id}`, productData);
        return response.data;
    },
};

export default apiService;