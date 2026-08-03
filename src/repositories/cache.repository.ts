import { serverConfig } from "../config";
import { redisClient } from "../config/redis";

export class CacheRepository {
    async getNextId() : Promise<number> {
        const key = serverConfig.REDIS_COUNTER_KEY;
        if(!redisClient.isOpen){
            await redisClient.connect();
        }
        const nextId = await redisClient.incr(key);
        return nextId;
    }
    async setUrlMapping(shortUrl: string, originalUrl: string) {
        const key = `url:${shortUrl}`;
        if(!redisClient.isOpen){
            await redisClient.connect();
        }
        await redisClient.set(key, originalUrl, {
            EX:86400
        });
        return;
    }

    async getUrlMapping(shortUrl: string): Promise<string | null> {
        const key = `url:${shortUrl}`;
        if(!redisClient.isOpen){
            await redisClient.connect();
        }
        const originalUrl = await redisClient.get(key);
        return originalUrl;
    }

    async deleteUrlMapping(shortUrl: string): Promise<void> {
        const key = `url:${shortUrl}`;  
        if(!redisClient.isOpen){
            await redisClient.connect();
        }
        await redisClient.del(key);
        return;
    }
}