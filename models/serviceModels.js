const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

   name: {
        type: String,
        validate: {
               validator: (v) => /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/.test(v),
               message: 'Digite el nombre correctamente',
        },
        required: true,
   },
   email: {
        type: String,
        required: true,
   },
   city: {
        type: String,
        required: true,
   },
   date: {
        type: String,
        required: true,
   },
   address: {
        type: String,
        required: true,
   },
   status: {
        type: String,
   },
   item: {
        type: String,
   },
   weight: {
        type: String,
   },
   qty: {
        type: String,
   },
   id_user: {
        type: String,
        required: true,
   }


}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);