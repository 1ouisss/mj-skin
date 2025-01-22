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
    console.log('Querying Airtable:', {
      filterCriteria: {
        skinType,
        conditions,
        concerns
      }
    });

    const records = await base("Recommendations")
      .select({
        filterByFormula: `AND(
          LOWER(TRIM({SkinType})) = LOWER("${skinType}"),
          LOWER(TRIM({Conditions})) = LOWER("${conditions}"),
          LOWER(TRIM({Concerns})) = LOWER("${concerns}")
        )`,
      })
      .all();

    console.log('Airtable Query Results:', {
      recordCount: records.length,
      fields: records.length > 0 ? Object.keys(records[0].fields) : [],
      timestamp: new Date().toISOString()
    });

    if (!records.length) {
      console.warn('No matching recommendations found in Airtable');
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
    console.log('Calling OpenAI:', {
      model: "gpt-3.5-turbo",
      promptLength: prompt.length,
      timestamp: new Date().toISOString()
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI Response:', {
      status: 'success',
      responseLength: completion.choices[0].message.content.length,
      finishReason: completion.choices[0].finish_reason,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      recommendations: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error in /api/recommendations:', {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    const statusCode = error.status || 500;
    res.status(statusCode).json({
      error: "Internal Server Error",
      details: error.message,
      timestamp: new Date().toISOString()
    });
  } finally {
    console.timeEnd('request-duration');
    console.groupEnd();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
