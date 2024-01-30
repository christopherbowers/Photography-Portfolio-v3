import { Router } from 'express';
import { registerUser, loginUser, checkSession } from '../controllers/AuthController.js';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';

const AuthRoutes = Router();

AuthRoutes.post('/register', registerUser);
AuthRoutes.post('/login', loginUser);
AuthRoutes.get('/session', ProtectMiddleware, checkSession);

export { AuthRoutes };
