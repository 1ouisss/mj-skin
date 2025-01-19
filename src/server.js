
const express = require('express');
const Airtable = require('airtable');
const OpenAI = require('openai');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Airtable Routes
app.get('/airtable/users', async (req, res) => {
  try {
    const records = await base('User Responses').select().all();
    res.json(records.map(record => ({
      id: record.id,
      ...record.fields
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/airtable/recommendations', async (req, res) => {
  try {
    const records = await base('Recommendations').select().all();
    res.json(records.map(record => ({
      id: record.id,
      ...record.fields
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/openai/analyze', async (req, res) => {
  try {
    const { userResponses } = req.body;
    
    // Fetch relevant recommendations from Airtable
    const recommendations = await base('Recommendations')
      .select({
        filterByFormula: `AND(
          FIND("${userResponses.skinType}", {SkinType}),
          FIND("${userResponses.concerns}", {Concerns})
        )`
      }).all();

    // Prepare the prompt for OpenAI with Airtable data
    const prompt = `Based on the following user responses and product recommendations, provide personalized skincare advice:
      User Profile:
      ${JSON.stringify(userResponses, null, 2)}
      
      Available Products:
      ${JSON.stringify(recommendations.map(r => r.fields), null, 2)}
      
      Please provide recommendations in the following format:
      1. Skin Type Analysis
      2. Main Concerns
      3. Recommended Products (use products from the available list)
      4. Daily Routine`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.json({ 
      recommendations: completion.choices[0].message.content,
      success: true 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: req.body.text }],
      model: "gpt-3.5-turbo",
    });
    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
