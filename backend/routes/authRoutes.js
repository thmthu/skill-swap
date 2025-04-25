import { Router } from 'express';
import { 
    register, 
    login, 
    logout, 
    refreshToken
} from '../controllers/authControllers.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', authMiddleware, refreshToken);
