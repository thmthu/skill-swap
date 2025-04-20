import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userMockData } from './userMockData.js';
import User from '../models/User.js';

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        await User.deleteMany({});
        console.log('Cleared existing users');

        const users = await Promise.all(
            userMockData.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return {
                    ...user,
                    password: hashedPassword
                };
            })
        );

        await User.insertMany(users);
        console.log('Successfully seeded users');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers(); 