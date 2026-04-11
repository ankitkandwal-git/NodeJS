const { nanoid } = require('nanoid');
const { createUrl } = require('../models/user.model');
const { getUrlCode } = require('../models/user.model');
const createShortUrlService = async (db, longUrl) => {
    const shortCode = nanoid(7);
    const baseUrl = 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${shortCode}`;
    await createUrl(db, { shortCode, longUrl, shortUrl });
    return {
        shortCode,
        longUrl,
        shortUrl,
    };
};
const getShortUrlService = async(db,shortCode) =>{
    const data = await getUrlCode(db, shortCode);
    console.log("DB RESULT:", data);
    if(!data){
        throw new Error('Short URL not found');
    }
    return data.originalUrl;
}
module.exports = {
    createShortUrlService,
    getShortUrlService
};