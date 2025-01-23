const express = require("express");
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Load recommendations data
const recommendationsPath = path.join(__dirname, 'data', 'skincare-db.json');
let data;

try {
  data = JSON.parse(fs.readFileSync(recommendationsPath, 'utf8'));
} catch (error) {
  console.error('Failed to load skincare database:', error);
  process.exit(1);
}

// GET endpoint for recommendations with query parameters
app.get("/recommendations", (req, res) => {
  try {
    const { skinType, conditions, concerns } = req.query;

    let result = null;
    if (skinType && data.skinTypes?.[skinType]) {
      result = data.skinTypes[skinType];
    } else if (conditions && data.conditions?.[conditions]) {
      result = data.conditions[conditions];
    } else if (concerns && data.concerns?.[concerns]) {
      result = data.concerns[concerns];
    }

    if (!result) {
      return res.status(404).json({
        error: "Not Found",
        message: "No matching recommendations found."
      });
    }

    res.json({
      success: true,
      recommendations: result
    });
  } catch (error) {
    console.error('Error serving recommendations:', error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});