
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Load skincare data
const skincareData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'skincare-db.json'), 'utf8')
);

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
