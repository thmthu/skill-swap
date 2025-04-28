import { Router } from 'express';
import { 
    getAllUsers,
    getUserProfile,
    addSkill,
    addLearn,
    deleteSkill,
    deleteLearn
} from '../controllers/userControllers.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

export const router = Router();

router.get('/', getAllUsers);
router.get('/me', authMiddleware, getUserProfile);
router.post('/skills', authMiddleware, addSkill);
router.post('/learn', authMiddleware, addLearn);
router.delete('/skills', authMiddleware, deleteSkill);
router.delete('/learn', authMiddleware, deleteLearn);
