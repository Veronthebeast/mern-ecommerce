import React, { useState, useEffect } from 'react';
import API from '../services/api';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.getProducts();
                setProducts(response);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setMessage('No se pudieron obtener los productos. Inténtalo de nuevo.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Todos los Productos</h2>
            {message && <p>{message}</p>}
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {products.length === 0 ? (
                    <p>No hay productos disponibles.</p>
                ) : (
                    products.map(product => (
                        <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                            {product.image && <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />}
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Precio: ${product.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductPage;
