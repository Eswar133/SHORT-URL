const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // Ensure this is the correct path

router.get("/", async (req, res) => {
    try {
        const allurls = await URL.find({});
        return res.render("home", {
            urls: allurls,
        });
    } catch (err) {
        console.error("Error fetching URLs:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
