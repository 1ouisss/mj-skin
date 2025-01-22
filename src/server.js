const express = require("express");
const Airtable = require("airtable");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Server is running correctly!");
});

// Recommendations Route
app.post("/api/recommendations", async (req, res) => {
  console.group('=== /api/recommendations Request ===');
  console.time('request-duration');

  try {
    const { skinType, conditions, concerns } = req.body;

    // Log incoming request
    console.log('Incoming Request:', {
      timestamp: new Date().toISOString(),
      body: req.body,
      headers: req.headers,
      ip: req.ip
    });

    // Validate payload
    const requiredFields = ['skinType', 'conditions', 'concerns'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      console.warn('Validation Error:', {
        missingFields,
        receivedPayload: req.body
      });
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
        receivedFields: Object.keys(req.body)
      });
    }

    // Query Airtable
    const records = await base("Recommendations")
      .select({
        filterByFormula: `AND(
          LOWER(TRIM({SkinType})) = LOWER("${skinType}"),
          LOWER(TRIM({Conditions})) = LOWER("${conditions}"),
          LOWER(TRIM({Concerns})) = LOWER("${concerns}")
        )`,
      })
      .all();

    if (!records.length) {
      return res
        .status(404)
        .json({ error: "No matching recommendations found." });
    }

    // Prepare data for OpenAI
    const airtableData = records.map((record) => record.fields);

    const prompt = `
      Based on the following user responses and product recommendations, provide personalized skincare advice:

      User Responses:
      Skin Type: ${skinType}
      Conditions: ${conditions}
      Concerns: ${concerns}

      Recommendations from Airtable:
      ${JSON.stringify(airtableData, null, 2)}

      Please format your response as follows:
      1. Skin Type Analysis
      2. Main Concerns
      3. Recommended Products
      4. Daily Routine
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.json({
      success: true,
      recommendations: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in /api/recommendations:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  } finally {
    console.timeEnd('request-duration');
    console.groupEnd();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});