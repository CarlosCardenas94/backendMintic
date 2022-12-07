const express = require('express');
const serviceSchema = require('../models/serviceModels');


const router = express.Router();

router.get('/', async (req, res) => {
  await serviceSchema
    .find({})
    .then((data)=> res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
    res.status(200).json(serviceSchema);
});

router.get('/history/:id',async (req, res) => {
  const { id } = req.params;
   await serviceSchema
    .find({ id_user: id })
    .then((data)=> res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'Product not found',
    });
  } else {
    res.status(200).json({
      id,
      name: 'Envio a Cartagena',
      fecha: '2021-09-01',
      price: 1000
    })
  }
});


router.post('/newService/', (req, res) => {
  const params = req.body;
  const newService = new serviceSchema();
  newService.name = params.name;
  newService.email = params.email;
  newService.city = params.city;
  newService.date = params.date;
  newService.address = params.address;
  newService.status = params.status;
  newService.item = params.item;
  newService.weight = params.weight;
  newService.qty = params.qty;
  newService.id_user = params.id_user;
  newService
    .save()
    .then(() => res.json('Service added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  serviceSchema
    .findByIdAndDelete(id)
    .then(() => res.json('Service deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;