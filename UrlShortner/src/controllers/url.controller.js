const { createShortUrlService } = require('../services/url.services');
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

const redirectUrl = async(req,res) =>{
    const { shortCode } = req.params;
    try{
        const db = req.app.locals.db;
        const urlData = await shortUrlService.getUrlCode(db, shortCode);
        if(urlData){
            res.redirect(urlData.originalUrl);
            console.log("CODE:", req.params.code);
        }else{
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    createShortUrl,
    redirectUrl
};