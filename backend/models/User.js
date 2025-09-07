const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // El correo debe ser único
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false, // Por defecto, un usuario no es administrador
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);