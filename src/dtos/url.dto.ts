export interface CreateUrlDTO {
    originalUrl: string;
    shortUrl: string;
}

export class UrlRepository {
    async create(){}

    async findByShortUrl(){}

    async findAll() {}
    
    async incrementClicks() {}

    async findStatsByShortUrl() {}
}