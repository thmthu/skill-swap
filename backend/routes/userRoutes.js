import { Router } from 'express';
import { 
    getAllUsers,
    getUserProfile,
    addSkill,
    addLearn,
    deleteSkill,
    deleteLearn,
    updateUserPreference,
    getUserRecommendations
} from '../controllers/userControllers.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';

export const router = Router();

router.get('/', getAllUsers);
router.get('/me', authMiddleware, getUserProfile);
router.get('/recommendations', authMiddleware, getUserRecommendations);
router.post('/skills', authMiddleware, addSkill);
router.post('/learn', authMiddleware, addLearn);
router.delete('/skills', authMiddleware, deleteSkill);
router.delete('/learn', authMiddleware, deleteLearn);
router.patch('/preference', authMiddleware, updateUserPreference);
