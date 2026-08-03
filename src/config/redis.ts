import {createClient } from 'redis';
import { serverConfig } from '.';

export const redisClient = createClient({
    url: serverConfig.REDIS_URL 
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

export async function connectRedis() {
    if (!serverConfig.REDIS_URL) {
        console.warn('REDIS_URL not configured. Skipping Redis connection.');
        return;
    }

    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.warn('Redis not available. Continuing without Redis:', error);
    }
}

export async function closeRedis() {
    try {
        await redisClient.quit();
        console.log('Disconnected from Redis');
    } catch (error) {
        console.error('Error disconnecting from Redis:', error);
        throw error;
    }
}
