const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const skincareDataPath = path.join(__dirname, 'data', 'skincare-db.json');
let skincareData;

try {
  skincareData = JSON.parse(fs.readFileSync(skincareDataPath, 'utf8'));
} catch (error) {
  console.error('Failed to load skincare database:', error);
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Recommendations endpoint
app.get('/recommendations', (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;

    // Logic to filter recommendations based on query parameters
    const recommendations = skincareData.filter(item =>
      (skinType ? item.skinType === skinType : true) &&
      (condition ? item.condition === condition : true) &&
      (concerns ? item.concerns.includes(concerns) : true)
    );

    if (recommendations.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "No matching recommendations found."
      });
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Recommendation fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});