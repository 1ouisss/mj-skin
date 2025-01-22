
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

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Load recommendations data
const recommendationsPath = path.join(__dirname, 'data', 'skincare-db.json');
const data = JSON.parse(fs.readFileSync(recommendationsPath, 'utf8'));

// API Routes
app.get("/api/test", (req, res) => {
  res.json({ status: "Server is running correctly!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Recommendations Route
app.post("/api/recommendations", async (req, res) => {
  const requestId = Math.random().toString(36).substring(7);
  console.group(`=== /api/recommendations Request (ID: ${requestId}) ===`);
  console.time(`request-${requestId}-duration`);

  try {
    if (!req.body) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Request body is missing"
      });
    }

    const { skinType, conditions, concerns } = req.body;
    let result = null;

    // Try finding recommendations by skin type
    if (skinType && data.SkinType?.[skinType]) {
      result = data.SkinType[skinType];
    }
    // If not found, try conditions
    else if (conditions && data.Condition?.[conditions]) {
      result = data.Condition[conditions];
    }
    // Finally try concerns
    else if (concerns && data.Concerns?.[concerns]) {
      result = data.Concerns[concerns];
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
    console.error('Error:', error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  } finally {
    console.timeEnd(`request-${requestId}-duration`);
    console.groupEnd();
  }
});

// SPA routing - must be after API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log('API endpoints:');
  console.log('- GET /api/test');
  console.log('- GET /api/health');
  console.log('- POST /api/recommendations');
});
