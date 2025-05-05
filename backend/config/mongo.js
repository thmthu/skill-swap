import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

const connectMongo = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            autoIndex: true,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected');
        return true;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        // Don't terminate the process, just return false to indicate failure
        return false;
    }
}
export default connectMongo;