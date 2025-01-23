import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

// Configure CORS for all routes
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Serve static files with caching headers
app.use(express.static(path.join(__dirname, '../dist'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// API routes should be defined before the catch-all route
app.get('/api/recommendations', (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;
    console.log('Received query:', { skinType, condition, concerns });

    const recommendations = skincareData.filter(item => 
      item.skinType === skinType &&
      item.condition === condition &&
      item.concerns.includes(concerns)
    );

    console.log('Sending recommendations:', recommendations);
    res.json(recommendations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SPA catch-all route with proper error handling
app.get('/*', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Load skincare data
const skincareData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'skincare-db.json'), 'utf8')
);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});