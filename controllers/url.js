const shortid = require("shortid");
const URL = require("../models/url");



async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: 'url is required'});
    }
    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });
    return res.render('home', {
        id: shortID,
    });
    
};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (err) {
        console.error("Error fetching analytics:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}