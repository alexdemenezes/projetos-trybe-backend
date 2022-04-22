const express = require('express');

const salesControllers = require('../controllers/salesControllers');

const { isProductIdValid, isQuantityValid } = require('../middlewares/salesMiddlewares');

const route = express();

route.get('/', salesControllers.getAll);
route.get('/:id', salesControllers.getById);
route.post('/', isProductIdValid, isQuantityValid, salesControllers.create);
route.put('/:id', isProductIdValid, isQuantityValid, salesControllers.updateSale);

module.exports = route;
