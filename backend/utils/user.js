import User from '../models/User.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const getUserByReq = async (req) => {
    const accessToken = req.headers.authorization?.split(' ')[1] || req.cookies['accessToken'].value;
    if (!accessToken) {
        return null;
    }
    const decoded = verifyAccessToken(accessToken);
    const user = await User.findById(decoded.userId).select('-password');
    return user;
}

export const getUserById = async (userId) => {
    try {   
        const user = await User.findById(userId).select('-password');
        return user;
    } catch (error) {
        return null;
    }
}

