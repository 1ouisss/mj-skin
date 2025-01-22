const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.json());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/recommendations', limiter);

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Server is running correctly!");
});

// Recommendations Route
app.post("/api/recommendations", async (req, res) => {
  const requestId = Math.random().toString(36).substring(7);
  console.group(`=== /api/recommendations Request (ID: ${requestId}) ===`);
  console.time(`request-${requestId}-duration`);

  try {
    const { skinType, conditions, concerns, texturePreference, scentPreference } = req.body;
    
    console.log('Received payload:', { skinType, conditions, concerns, texturePreference, scentPreference });

    // Validate required fields
    if (!skinType || !conditions || !concerns) {
      console.warn('Missing required fields:', { skinType, conditions, concerns });
      return res.status(400).json({
        error: "Bad Request",
        message: "Veuillez compléter toutes les questions requises."
      });
    }

    // Normalize the data
    const normalizedPayload = {
      skinType: String(skinType).trim(),
      condition: String(conditions).trim(),
      concern: String(concerns).trim(),
      texturePreference: texturePreference ? String(texturePreference).trim() : '',
      scentPreference: scentPreference ? String(scentPreference).trim() : ''
    };

    console.log('Normalized payload:', normalizedPayload);

    // Load recommendations from JSON file
    const recommendationsPath = path.join(__dirname, 'data', 'skincare-db.json');
    const recommendations = JSON.parse(fs.readFileSync(recommendationsPath, 'utf8'));

    const result = recommendations?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]
      ?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];

    if (!result) {
      console.warn('No matching recommendations found:', { skinType, condition, concern, texturePreference, scentPreference });
      return res.status(404).json({
        error: "Not Found",
        message: "No matching recommendations found for the provided criteria."
      });
    }

    console.log('Found matching recommendations:', {
      products: result.Products.length,
      routine: Object.keys(result.Routine)
    });

    res.json({
      success: true,
      recommendations: result
    });

  } catch (error) {
    console.error('Error processing recommendations:', error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  } finally {
    console.timeEnd(`request-${requestId}-duration`);
    console.groupEnd();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});