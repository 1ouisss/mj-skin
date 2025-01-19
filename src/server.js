
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

// Routes
app.get('/api/responses', async (req, res) => {
  try {
    const records = await base('User Responses').select().all();
    res.json(records.map(record => record.fields));
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
