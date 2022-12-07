const express = require('express');
const userSchema = require('../models/userModels');
const bcrypt = require('bcrypt');
const postManSchema = require('../models/postManModels');
const { restart } = require('nodemon');

const router = express.Router();

router.get('/', async (req, res) => {
  await userSchema
    .find({})
    .then((data)=> res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
    res.status(200).json(userSchema);
});
/* Obtener usuario por id */
router.get('/:id', async (req, res) => {
  const { id } = req.user;
  if (id.length === 24) {
    await userSchema.findById(id).then((usuario) => {
      if (!usuario) {
        return res.json({
          mensaje: 'No se encontro ningun usuario con esa ID',
        });
      }
      const {
        _id, contraseña, __v, ...resto
      } = usuario._doc;
      res.json(resto);
    });
  } else {
    res.json({ mensaje: 'Estas enviando una contraseña incorrecta' });
  }
});

/* Crear un nuevo usuario */
router.post('/add', (req, res) => {
  const { name, password, email, home, city_home } = req.body;
  
  userSchema.findOne({ email }).then((userRegister) => {
    if (userRegister) {
      return res.json({ mensaje: 'El usuario ya existe' });
    } if (!name || !email || !password || !home || !city_home) {
      return res.json({ mensaje: 'Faltan datos' });
    }
    bcrypt.hash(password, 10, (error, contraseñaHasheada) => {
      if (error) res.json({ error });
      else {
        const newUser = new userSchema({
          name,
          password: contraseñaHasheada,
          email,
          home,
          city_home,
        });
        newUser
         .save()
         .then((data) => res.json(data))
         .catch((err) => res.status(400).json('Error: ' + err));
      } 
    })
  })
});

router.patch('/update/:id', async (req, res) => {
  const { id } = req.params;
  const params = req.body;
  await userSchema
    .findByIdAndUpdate(id, params)
    .then(() => res.json('User updated!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/* Eliminar usuario */

router.delete('/:id', (req,res)=>{
  const { id } = req.params;
  userSchema
    .findByIdAndDelete(id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
})

/* Login usuario */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  await userSchema.findOne({ email }).then((name) => {
    if (!name) {
      return res.json({ mensaje: 'Usuario no encontrado' });
    }

    bcrypt.compare(password, name.password).then((esCorrecta) => {
      if (esCorrecta) {

        res.json({
          mensaje: 'Usuario logeado correctamente',
          usuario: {
            email,
            name,
          },
        });
      } else {
        return res.json({ mensaje: 'Contraseña incorrecta' });
      }
    });
  });
})

module.exports = router;