const mongoose = require('mongoose');

const postManSchema = new mongoose.Schema({

    name: String,
    email: String,
    rol: String,
    password: String,
    
});

module.exports = mongoose.model('Postman', postManSchema);