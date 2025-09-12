const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ruta para obtener todos los productos
// GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
});

// Ruta para obtener un solo producto por ID
// GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para crear un nuevo producto
// POST /api/products
router.post('/', async (req, res) => {
    const { name, description, price, category, image } = req.body;
    const newProduct = new Product({ name, description, price, category, image });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar un producto
// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para actualizar un producto
// PUT /api/products/:id
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, image },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

module.exports = router;
