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

connectMongo();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

// redisClient.connect();

// app.use('/api', authRouters, userRouters, connectionRouters);
app.use('/api/auth', authRouters);
app.use('/api/users', userRouters);
app.use('/api/connections', connectionRouters);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
