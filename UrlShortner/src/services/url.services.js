const { nanoid } = require('nanoid');
const { createUser } = require('../models/user.model');
const createShortUrlService = async (db, longUrl) => {
    const shortCode = nanoid(7);
    const baseUrl = 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${shortCode}`;
    await createUser(db, { shortCode, longUrl, shortUrl });
    return {
        shortCode,
        longUrl,
        shortUrl,
    };
};

module.exports = {
    createShortUrlService,
};