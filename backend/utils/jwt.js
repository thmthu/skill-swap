import jwt from 'jsonwebtoken';
import { 
    ACCESS_TOKEN_EXPIRE_TIME, 
    REFRESH_TOKEN_EXPIRE_TIME,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
} from '../config/env.js';
import redisClient from '../config/redis.js';

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE_TIME + 's' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRE_TIME + 's' });
    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (error) {
        console.error('Error verifying access token:', error, token);
        throw error;
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        throw error;
    }
};

export const addToBlacklist = async (token, expiry) => {
    try {
        await redisClient.set(`bl_${token}`, 'true', {
            EX: expiry
        });
    } catch (error) {
        console.error('Error adding token to blacklist:', error);
        throw error;
    }
};

export const isBlacklisted = async (token) => {
    try {
        const result = await redisClient.get(`bl_${token}`);
        return result !== null;
    } catch (error) {
        console.error('Error checking blacklist:', error);
        throw error;
    }
};
