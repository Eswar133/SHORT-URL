const express = require("express");
const { connectToMongoDb} = require ("./connect")
const app = express();

const urlRouter = require("./routes/url");
const URL = require("./models/url");
const PORT = 3000;

app.use(express.json());

app.use("/url", urlRouter);
app.use("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                        ipAddress: req.ip, // Consider using req.headers['x-forwarded-for'] for real IPs behind proxies
                    },
                },
            },
            { new: true } // Returns the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error("Error handling redirect:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


connectToMongoDb('mongodb://localhost:27017/short-url')
.then ( () => console.log('MongoDB connected') );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});