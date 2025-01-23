
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  credentials: true
}));

// Load skincare data
const skincareDataPath = path.join(__dirname, 'data', 'skincare-db.json');
let skincareData;

try {
  skincareData = JSON.parse(fs.readFileSync(skincareDataPath, 'utf8'));
} catch (error) {
  console.error('Failed to load skincare database:', error);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Input validation middleware
const validateRecommendationQuery = (req, res, next) => {
  const { skinType, condition, concerns } = req.query;
  
  if (!skinType || !condition || !concerns) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required parameters: skinType, condition, or concerns'
    });
  }
  next();
};

// Recommendations endpoint
app.get('/recommendations', validateRecommendationQuery, (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;
    console.log('Processing recommendation request:', { skinType, condition, concerns });

    // Filter recommendations based on query parameters
    const recommendations = skincareData.filter(item => {
      const matchesSkinType = item.skinType === skinType;
      const matchesCondition = item.condition === condition;
      const matchesConcerns = Array.isArray(item.concerns) && 
                            item.concerns.includes(concerns);

      return matchesSkinType && matchesCondition && matchesConcerns;
    });

    if (recommendations.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "No matching recommendations found."
      });
    }

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    console.error('Recommendation fetch error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message
    });
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
