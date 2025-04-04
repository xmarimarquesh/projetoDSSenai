import express from 'express';
import { validateLogin, validateRegister } from '../middlewares/AuthMiddlewares.ts';
import AuthController from '../controller/AuthController.js';

const route = express.Router();

route.post('/register', validateRegister, AuthController.register);
route.post('/login', validateLogin, AuthController.login);

export default route;