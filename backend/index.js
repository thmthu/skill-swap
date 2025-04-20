import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { 
    authRouters,
    userRouters,
    connectionRouters
} from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection error:', err));

// app.use('/api', authRouters, userRouters, connectionRouters);
app.use('/api/auth', authRouters);
app.use('/api/users', userRouters);
app.use('/api/connections', connectionRouters);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
