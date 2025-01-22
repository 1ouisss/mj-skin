import express from "express";
import Airtable from "airtable";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID,
);

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Server is running correctly!");
});

// Recommendations Route
app.post("/api/recommendations", async (req, res) => {
  try {
    const { skinType, conditions, concerns } = req.body;

    // Validate payload
    if (!skinType || !conditions || !concerns) {
      return res.status(400).json({
        error: "Missing required fields: skinType, conditions, or concerns.",
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

    // Call OpenAI
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
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
