const express = require('express');

const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
} = require('../middlewares/userMiddlewares');

const route = express();

route.get('/', authMiddleware, userControllers.getAll);
route.get('/:id', authMiddleware, userControllers.getById);
route.post('/', isDisplayNameValid, isEmailValid, isPasswordValid, userControllers.create);
route.delete('/me', authMiddleware, userControllers.deleteUser);

module.exports = route;