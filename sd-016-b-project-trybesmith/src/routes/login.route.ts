import express from 'express';
import isUsernameValid from '../middlewares/isUsernameValid';
import isPasswordValid from '../middlewares/isPasswordValid';
import { login } from '../controllers/user.controller';

const route = express();

route.post('/', isUsernameValid, isPasswordValid, login);

export default route;