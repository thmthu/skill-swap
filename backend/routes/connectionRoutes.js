import { Router } from 'express';
import { createConnection, respondConnection } from '../controllers/connectionControllers.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

export const router = Router();

router.post('/', authMiddleware, createConnection);
router.patch('/respond', authMiddleware, respondConnection);
