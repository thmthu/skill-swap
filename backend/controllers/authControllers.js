import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { 
    COOKIE_OPTIONS,
    ACCESS_TOKEN_EXPIRE_TIME,
    CLIENT_REDIRECT_URL,
    GOOGLE_OAUTH_CLIENT,
    GOOGLE_OAUTH_SECRET,
    GOOGLE_CALLBACK_URL
} from '../config/env.js';
import {
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken,
    addToBlacklist
} from "../utils/jwt.js"
import passport from 'passport';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existedUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existedUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            username, 
            email, 
            password: hashedPassword
        });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'User registered with Google, please login with Google' });
        }
        const passChecked = await bcrypt.compare(password, user.password)
        if (!passChecked) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const { accessToken, refreshToken } = generateTokens({ userId: user._id })
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            httpOnly: true,
            maxAge: parseInt(ACCESS_TOKEN_EXPIRE_TIME) * 1000
        });
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

        return res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] || req.cookies['accessToken'];
        if (accessToken) {
            const decoded = verifyAccessToken(accessToken);
            const expiry = decoded.exp - Math.floor(Date.now() / 1000);
            await addToBlacklist(accessToken, expiry);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// when access token expires when user still logged in -> use refresh token to generate new access token
export const refreshToken = async (req, res) => {
    const cookieRefreshToken = req.cookies['refreshToken'];
    if (!cookieRefreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = verifyRefreshToken(cookieRefreshToken);
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== cookieRefreshToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const { accessToken, refreshToken } = generateTokens({ userId: user._id });
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            httpOnly: false,
            maxAge: parseInt(ACCESS_TOKEN_EXPIRE_TIME) * 1000
        });
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

        return res.status(200).json({ message: 'Tokens refreshed successfully' });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export const googleAuth = (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false
    })(req, res, next);
  };
  
  export const googleAuthCallback = async (req, res, next) => {
    const createErrorUrl = (message, state) => {
      const params = new URLSearchParams({
        error: message,
        ...(state && { state }) // Add state if it exists
      });
      return `${CLIENT_REDIRECT_URL}/auth?${params.toString()}`;
    };
  
    passport.authenticate('google', { session: false }, async (err, user, info) => {
      try {
        // If there's an error from the strategy (e.g., database error), redirect with the error message
        if (err) return res.redirect(createErrorUrl(err.message || 'Authentication error', req.query.state));
  
        // If authentication fails (user is false), redirect with the specific message from the strategy
        if (!user) return res.redirect(createErrorUrl(info?.message || 'Authentication failed', req.query.state));
  
        // If authentication succeeds, generate tokens and set cookies
        const { accessToken, refreshToken } = generateTokens({ userId: user._id });
  
        res.cookie('accessToken', accessToken, {
          ...COOKIE_OPTIONS,
          httpOnly: false,
          maxAge: parseInt(ACCESS_TOKEN_EXPIRE_TIME) * 1000
        });
  
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  
        // Redirect based on the flow (signup or login)
        const redirectUrl = req.query.state === 'signup'
          ? CLIENT_REDIRECT_URL + '/auth?state=login&message=Signup successful'
          : CLIENT_REDIRECT_URL + '/home?message=Login successful';
        res.redirect(redirectUrl);
      } catch (error) {
        // Catch unexpected server errors (not authentication failures)
        res.redirect(createErrorUrl('Server Error', req.query.state));
      }
    })(req, res, next);
  };

export default { register, login, logout, refreshToken, googleAuth, googleAuthCallback };
