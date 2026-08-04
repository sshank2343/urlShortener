import { UrlRepository } from "../repositories/url.repository";
import { CacheRepository } from "../repositories/cache.repository";
import { toBase62 } from "../utils/base62";
import { serverConfig } from "../config";

export class UrlService {
    constructor(
        private readonly urlRepository: UrlRepository,
        private readonly cacheRepository: CacheRepository
    ){}

    async createShortUrl(originalUrl: string){
        const nextId = await this.cacheRepository.getNextId();
        const shortUrl = toBase62(nextId);
        const url = await this.urlRepository.create({
            originalUrl,
            shortUrl
        })
        // cache the url mapping
        await this.cacheRepository.setUrlMapping(shortUrl, originalUrl);
        const baseUrl= serverConfig.BASE_URL;
        const fullUrl = `${baseUrl}/${shortUrl}`;
        return {
            id: url._id.toString() || "",
            shortUrl,
            originalUrl,
            fullUrl,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt
        }
    }

    async getOriginalUrl(shortUrl: string){
        const originalUrl = await this.cacheRepository.getUrlMapping(shortUrl);
        if(originalUrl){
            await this.urlRepository.incrementClicks(shortUrl);
            return {
                originalUrl,
                shortUrl
            }
        }
        const url = await this.urlRepository.findByShortUrl(shortUrl);
        if(!url){
            throw new Error("URL not found");
        }

        await this.urlRepository.incrementClicks(shortUrl);

        await this.cacheRepository.setUrlMapping(shortUrl, url.originalUrl);
        return {
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl
        }
        throw new Error("URL not found");
    }
}