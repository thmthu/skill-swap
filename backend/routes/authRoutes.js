import { Router } from 'express';
import { 
    register, 
    login, 
    logout, 
    refreshToken,
    googleAuth,
    googleAuthCallback
} from '../controllers/authControllers.js';
import { authMiddleware } from '../middlewares/authMiddlewares.js';
import passport from 'passport';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', authMiddleware, refreshToken);

router.get('/google/signup', (req, res, next) => {
    return passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: 'signup'
    })(req, res, next);
  });
  
router.get('/google/login', (req, res, next) => {
    return passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: 'login'
    })(req, res, next);
});
    
router.get('/google/callback', googleAuthCallback);