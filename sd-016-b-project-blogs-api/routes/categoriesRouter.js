const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const isCategorieNameValid = require('../middlewares/categoriesMiddleware');
const CategoriesController = require('../controllers/categorieController');

const route = express();

route.post('/', isCategorieNameValid, authMiddleware, CategoriesController.create);
route.get('/', authMiddleware, CategoriesController.getAll);

module.exports = route;
