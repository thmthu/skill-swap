import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { 
    authRouters,
    userRouters,
    connectionRouters
} from './routes/routes.js';
import connectMongo from './config/mongo.js';
import redisClient from './config/redis.js';
import session from 'express-session';
import passport from 'passport';
import setupPassport from './config/passport.js';
import { SESSION_SECRET, 
          NODE_ENV,
          PORT,
          FRONTEND_URL
} from './config/env.js';
import cors from 'cors';
connectMongo();

const app = express();
const port = PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

// redisClient.connect();
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

setupPassport(); 
app.use(passport.initialize());
app.use(passport.session());

// app.use('/api', authRouters, userRouters, connectionRouters);
app.use('/api/auth', authRouters);
app.use('/api/users', userRouters);
app.use('/api/connections', connectionRouters);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
