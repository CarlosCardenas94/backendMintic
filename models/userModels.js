const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        validate: {
            validator: (v) => /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(v),
            message: 'Digite el nombre correctamente',
        },
        required: [true, 'El nombre es requerido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    email: {
        type: String,
        validate: {
          validator: (v) => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v),
          message: 'Email Invalido',
        },
        required: [true, ' email Requerido'],
    },
    home: {
        type: String,
        required: [true, 'La dirección es requerida'],
    },
    city_home: {
        type: String,
        required: [true, 'La ciudad es requerida'],
    }
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);