import express from 'express';
import productController from '../controllers/product.controller';
import isNameValid from '../middlewares/isNameValid';
import isAmountValid from '../middlewares/isAmountValid';

const route = express();

route.get('/', productController.getAll);
route.post('/', isNameValid, isAmountValid, productController.create);

export default route;