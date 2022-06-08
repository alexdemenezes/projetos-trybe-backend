import express from 'express';
import orderController from '../controllers/order.controller';

const route = express();

route.get('/', orderController);

export default route;