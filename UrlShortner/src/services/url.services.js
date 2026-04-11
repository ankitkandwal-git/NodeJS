const { nanoid } = require('nanoid');
const {client} = require('../config/redis');
const { createUrl } = require('../models/user.model');
const { getUrlCode,incrementClicks } = require('../models/user.model');
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
    await incrementClicks(db,shortCode);
    return data.originalUrl;
}

const getService = async(db,shortCode) =>{
    const data = await getUrlCode(db,shortCode);
    if(!data){
        throw new Error('Short URL not found');
    }
    return{
        shortCode : data.shortCode,
        longUrl : data.originalUrl,
        shortUrl : data.shortUrl,
        clicks : data.clicks
    }
}
const getShortUrlFromCache = async(shortCode) =>{
    const cached = await client.get(shortCode);
    if(cached){
        return JSON.parse(cached);
    }
    console.log("REDIS MISS");
  const data = await getUrlCode(db, shortCode);
  if (!data) {
    throw new Error('Short URL not found');
  }
  await client.set(shortCode, data.originalUrl);
  await incrementClicks(db, shortCode);
  return data.originalUrl;
}
module.exports = {
    createShortUrlService,
    getShortUrlService,
    getService,
    getShortUrlFromCache
};