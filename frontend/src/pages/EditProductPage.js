import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await API.getProductById(id);
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image
                });
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setMessage('Error al cargar los datos del producto.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.updateProduct(id, formData);
            setMessage('Producto actualizado con éxito!');
            navigate('/admin'); // Redirigir al panel de administración después de actualizar
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setMessage('Error al actualizar el producto.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Editar Producto</h2>
            {message && <p style={{ color: message.includes('éxito') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="image">URL de la imagen:</label>
                    <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditProductPage;
