const express = require('express');

const {
  isEmailValid,
  isPasswordValid,
} = require('../middlewares/loginMiddlewares');

const loginController = require('../controllers/loginController');

 const route = express();

 route.post('/', isEmailValid, isPasswordValid, loginController.login);

module.exports = route;