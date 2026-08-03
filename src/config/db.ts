import mongoose from 'mongoose';
import { serverConfig } from '.';

export async function connectDB() {
    if (!serverConfig.MONGO_URI) {
        console.warn('MONGO_URI not configured. Skipping MongoDB connection.');
        return;
    }

    try {
        await mongoose.connect(serverConfig.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.warn('MongoDB not available. Continuing without MongoDB:', error);
    }
}