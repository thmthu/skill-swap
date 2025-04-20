import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        await mongoose.connect({
            autoIndex: true,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}
export default connectMongo;
