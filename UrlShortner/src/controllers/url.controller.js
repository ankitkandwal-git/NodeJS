const { createShortUrlService } = require('../services/url.services');
const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'Long URL is required' });
    }
    try {
        const db = req.app.locals.db;
        const shortUrl = await createShortUrlService(db, longUrl);
        res.status(201).json(shortUrl);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createShortUrl,
};