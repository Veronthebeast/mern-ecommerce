import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Este es el objeto de servicio que contiene todas las funciones de la API.
const apiService = {
    // Función para obtener todos los productos
    getProducts: async () => {
        const response = await API.get('/products');
        return response.data;
    },
    
    // Función para agregar un nuevo producto
    addProduct: async (productData) => {
        const response = await API.post('/products', productData);
        return response.data;
    },
    
    // Función para eliminar un producto por su ID
    deleteProduct: async (id) => {
        const response = await API.delete(`/products/${id}`);
        return response.data;
    },
};

export default apiService;
