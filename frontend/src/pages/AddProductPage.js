import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState(''); // Este estado ahora guardará la URL de Cloudinary
    const [file, setFile] = useState(null); // Nuevo estado para el archivo seleccionado
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false); // Nuevo estado para indicar la subida
    const navigate = useNavigate();

    // Función para subir la imagen a Cloudinary
    const uploadImage = async () => {
        if (!file) return null;
        
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mern_ecommerce'); // Asegúrate de que este sea el nombre de tu preset

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/doqus0swv/image/upload`, // ¡CAMBIA ESTO!
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await res.json();
            setUploading(false);
            return data.secure_url; // Devuelve el URL público de la imagen
        } catch (error) {
            setUploading(false);
            console.error('Error al subir la imagen:', error);
            setMessage('Error al subir la imagen.');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // 1. Subir la imagen a Cloudinary y obtener el URL
        const imageUrl = await uploadImage();
        if (!imageUrl) return;
        
        const productData = {
            name,
            description,
            price: Number(price),
            countInStock: Number(countInStock),
            image: imageUrl, // Usar el URL de Cloudinary
            category,
            brand,
        };

        try {
            const token = localStorage.getItem('userToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            await API.post('/products', productData, config);
            setMessage('Producto agregado con éxito!');
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
        } catch (error) {
            console.error('Error al agregar el producto:', error.response.data);
            setMessage('Error al agregar el producto.');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
            <h2>Agregar Nuevo Producto</h2>
            {message && <p>{message}</p>}
            {uploading && <p>Subiendo imagen...</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Descripción:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Precio:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Cantidad en stock:</label>
                    <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>URL de la imagen:</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} disabled />
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Categoría:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Marca:</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                </div>
                <button type="submit" disabled={uploading}>Agregar Producto</button>
            </form>
        </div>
    );
};

export default AddProductPage;