import express from 'express';
import { create } from '../controllers/user.controller';
import isUsernameValid from '../middlewares/isUsernameValid';
import isClasseValid from '../middlewares/isClasseValid';
import isPasswordValid from '../middlewares/isPasswordValid';
import isLevelValid from '../middlewares/isLevelValid';

const route = express();
route.post('/', isUsernameValid, isClasseValid, isLevelValid, isPasswordValid, create);

export default route;