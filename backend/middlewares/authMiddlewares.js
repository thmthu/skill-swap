import { verifyAccessToken, isBlacklisted } from '../utils/jwt.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies['accessToken']; // Bearer [token]
    if (!token) {
        return res.status(401).json({ message: 'Auth Middlewares: Access denied. No token provided.' });
    }
    try {
        const checkBlacklist = await isBlacklisted(token);
        if (checkBlacklist) {
            return res.status(401).json({ message: 'Auth Middlewares: Access denied. Token revoked.' });
        }
        const decoded = verifyAccessToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Auth Middlewares: Access denied. Invalid token.', 
            error: error.message });
    }
}


