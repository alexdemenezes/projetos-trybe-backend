const express = require('express');

const productsControllers = require('../controllers/productsControllers');

const { isNameValid, isQuantityValid } = require('../middlewares/productsMiddlewares');

const route = express();

route.get('/', productsControllers.getAll);
route.get('/:id', productsControllers.getById);
route.post('/', isNameValid, isQuantityValid, productsControllers.create);
route.put('/:id', isNameValid, isQuantityValid, productsControllers.update);
route.delete('/:id', productsControllers.deleteProduct);
module.exports = route;
