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
router.get('/:userId', authMiddleware, getUserProfile);
router.post('/:userId/skills', authMiddleware, addSkill);
router.post('/:userId/learn', authMiddleware, addLearn);
router.delete('/:userId/skills', authMiddleware, deleteSkill);
router.delete('/:userId/learn', authMiddleware, deleteLearn);
