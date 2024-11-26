const express = require("express");
const app = express();
const path = require("path");

const { connectToMongoDb} = require ("./connect")
const urlRouter = require("./routes/url");
const URL = require("./models/url");
app.set("views", path.resolve('./views'));
const staticRoute = require("./routes/staticRouter");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.set("view engine", "ejs");


app.use("/url", urlRouter);
app.use("/", staticRoute);
// Define /test route first


// Then define the dynamic /:shortId route
app.use("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                        ipAddress: req.ip, // Correctly tracks IP
                    },
                },
            },
            { new: true } // Returns the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectUrl); // Ensures the correct URL is used
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

