const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/userModels');

const login = async (req, res) => {
  const { email, password } = req.body;

  user.findOne({ email }).then((usuario) => {
    if (!usuario) {
      return res.json({ mensaje: 'Usuario no encontrado' });
    }

    bcrypt.compare(password, usuario.password).then((esCorrecta) => {
      if (esCorrecta) {
        const { id, nombre } = usuario;

        const data = {
          id,
          nombre,
        };

        const token = jwt.sign(data, 'secreto', {
          expiresIn: 86400 /* 24hs */,
        });

        res.json({
          mensaje: 'Usuario logeado correctamente',
          usuario: {
            id,
            nombre,
            token,
          },
        });
      } else {
        return res.json({ mensaje: 'Contraseña incorrecta' });
      }
    });
  });
};

module.exports = login;