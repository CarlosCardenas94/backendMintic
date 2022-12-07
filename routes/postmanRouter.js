const express = require('express');
const postManSchema = require('../models/postManModels');
const serviceSchema = require('../models/serviceModels');

const router = express.Router();

router.get('/', async (req, res) => {
  await postManSchema
    .find({})
    .then((data)=> res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
    res.status(200).json(postManSchema);
});



/* Resgistro cartero */
router.post('/addPostman', (req, res) => {
    const params = req.body;
    const newPostman = new postManSchema();
    newPostman.name = params.name;
    newPostman.email = params.email;
    newPostman.rol = params.rol;
    newPostman.password = params.password;
    newPostman
        .save()
        .then(() => res.json('Postman added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

/* Servicios pendientes */
router.get('/services', async (req, res) => {
    await serviceSchema
        .find({})
        .then((data)=> res.json(data))
        .catch((err) => res.status(400).json('Error: ' + err));
});

/* actualización de estado de envio */
router.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    await serviceSchema
        .findByIdAndUpdate(id, params)
        .then(() => res.json('Service updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/delete', (req, res) =>{
    const { id } = req.params;
    serviceSchema
        .findByIdAndDelete(id)
        .then(() => res.json('Service deleted.'))
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;