import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { generateTokens } from "../utils/jwt.js";
import {
    GOOGLE_OAUTH_CLIENT,
    GOOGLE_OAUTH_SECRET,
    GOOGLE_CALLBACK_URL
} from './env.js';

const setupPassport = () => {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_OAUTH_CLIENT,
    clientSecret: GOOGLE_OAUTH_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
        const isSignUpFlow = req.query.state === 'signup';
        const user = await User.findOne({
            $or: [
                { googleId: profile.id },
                { email: profile.emails[0].value }
            ]
        });
    
        if (isSignUpFlow) {
            if (user) {
            return done(null, false, { 
                message: 'Email already exists. Please login instead.' 
            });
            }
    
            const newUser = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                avatar: profile.photos[0].value
                // Fake password để pass validation
            });
    
            return done(null, newUser);
        }
    
        // Xử lý đăng nhập
        if (user) {
                if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
            }
            return done(null, user);
        }
    
        return done(null, false, { 
            message: 'Account not found. Please sign up first.' 
        });
    
        } catch (error) {
            return done(error);
        }
    }
    
  ));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialization
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};


export default setupPassport;