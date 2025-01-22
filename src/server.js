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

    if (typeof skinType !== 'string' || typeof conditions !== 'string' || typeof concerns !== 'string') {
      return res.status(400).json({
        error: "Bad Request",
        message: "Format des données invalide."
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

    // Normalize inputs to match database structure
    const normalizedSkinType = skinType.trim();
    const normalizedCondition = conditions.trim();
    const normalizedConcern = concerns.trim();
    const normalizedTexture = texturePreference.trim();
    const normalizedScent = scentPreference.trim();

    console.log('Looking up recommendations for:', {
      normalizedSkinType,
      normalizedCondition,
      normalizedConcern,
      normalizedTexture,
      normalizedScent
    });

    // Get base recommendations by skin type
    let result = recommendations?.SkinType?.[normalizedSkinType];
    
    // If we have a condition, try to get more specific recommendations
    if (normalizedCondition && result?.Condition?.[normalizedCondition]) {
      result = result.Condition[normalizedCondition];
    }

    // If we have concerns, try to get even more specific recommendations
    if (normalizedConcern && result?.Concern?.[normalizedConcern]) {
      result = result.Concern[normalizedConcern];
    }

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