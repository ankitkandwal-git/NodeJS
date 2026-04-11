const { createShortUrlService,getService} = require('../services/url.services');
const shortUrlService = require('../services/url.services');
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

const { getShortUrlService } = require('../services/url.services');

const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const db = req.app.locals.db;

        const longUrl = await getShortUrlService(db, shortCode);
        return res.redirect(longUrl);
    } catch (err) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
};
const getStats = async(req,res) =>{
    const { shortCode } = req.params;
    try{
        const db = req.app.locals.db;
        const stats = await getService(db,shortCode);
        res.json(stats);
    }catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    createShortUrl,
    redirectUrl,
    getStats
};