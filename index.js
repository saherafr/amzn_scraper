const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT || 4000;

const generateScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;
    
    if (!apiKey) {
        return res.status(400).json({ error: "API key is required." });
    }

    try {
        const response = await request({
            uri: `${generateScrapeUrl(apiKey)}&url=https://www.amazon.ca/dp/${productId}`,
            json: true
        });
        res.json(response);
    } catch(error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product details." });
    }
});

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    if (!apiKey) {
        return res.status(400).json({ error: "API key is required." });
    }

    try {
        const response = await request({
            uri: `${generateScrapeUrl(apiKey)}&url=https://www.amazon.ca/product-reviews/${productId}`,
            json: true
        });
        res.json(response);
    } catch(error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch product reviews." });
    }
});

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    if (!apiKey) {
        return res.status(400).json({ error: "API key is required." });
    }

    try {
        const response = await request({
            uri: `${generateScrapeUrl(apiKey)}&url=https://www.amazon.ca/gp/offer-listing/${productId}`,
            json: true
        });
        res.json(response);
    } catch(error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ error: "Failed to fetch product offers." });
    }
});

// Search Product
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { apiKey } = req.query;

    if (!apiKey) {
        return res.status(400).json({ error: "API key is required." });
    }

    try {
        const response = await request({
            uri: `${generateScrapeUrl(apiKey)}&url=https://www.amazon.ca/s?k=${searchQuery}`,
            json: true
        });
        res.json(response);
    } catch(error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Failed to search products." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
