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

// Ruta para crear un nuevo producto
// POST /api/products
router.post('/', async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;
    const newProduct = new Product({ name, description, price, category, imageUrl });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;