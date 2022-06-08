import express from 'express';
import { productRoute, userRoute, orderRoute, loginRoute } from './routes';

const app = express();

app.use(express.json());

app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);
app.use('/login', loginRoute);

export default app;
