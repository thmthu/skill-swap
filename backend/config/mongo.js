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
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}   
export default connectMongo;