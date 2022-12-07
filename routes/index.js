const express = require('express');
/* modulos */
const servicesRouter = require('./servicesRouter');
const usersRouter = require('./usersRouter');
const postmanRouter = require('./postmanRouter');
const cors = require('cors');
const verifyToken = require('../middlewares/verifyToken');
const controllers = require('../controllers/login');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/services', servicesRouter);
  router.use('/users', usersRouter);
  router.use('/postman', postmanRouter);
}

module.exports = routerApi;