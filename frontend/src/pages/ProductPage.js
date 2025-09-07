import React, { useState, useEffect } from 'react';
import API from '../services/api';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <h2>Todos los Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductPage;