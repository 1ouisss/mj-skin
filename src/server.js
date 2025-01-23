const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

const skincareData = require('./data/skincare-db.json');

// Configure CORS for all origins
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/recommendations', (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;
    const recommendations = skincareData.filter((item) => {
      return (
        item.skinType === skinType &&
        item.condition === condition &&
        item.concerns.includes(concerns)
      );
    });
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendation fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});