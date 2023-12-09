import { Router } from 'express';
import { registerUser, loginUser, checkSession } from '../controllers/AuthController.js';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';

export const AuthRoutes = Router();

AuthRoutes.route('/register').post(registerUser);
AuthRoutes.route('/login').post(loginUser);
AuthRoutes.route('/session').get(ProtectMiddleware, checkSession);
