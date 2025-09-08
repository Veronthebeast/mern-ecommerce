const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Importa las rutas de productos
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de usuario

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a la base de datos de MongoDB"))
    .catch(err => console.log(err));

// Conecta las rutas de productos al prefijo /api/products
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Conecta las rutas de usuario

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});