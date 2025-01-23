import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Import skincare data
const skincareData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'skincare-db.json'), 'utf8')
);

// Configure CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, '../dist')));

// Ensure the dist directory exists and is accessible
const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Create an empty index.html if it doesn't exist
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, '<!DOCTYPE html><html><body>Loading...</body></html>');
}

// Serve index.html for all routes to support client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build the project first using npm run build');
  }
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/recommendations', (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;
    console.log('Query params:', { skinType, condition, concerns });
    const recommendations = skincareData.filter((item) => {
      return (
        item.skinType === skinType &&
        item.condition === condition &&
        item.concerns.includes(concerns)
      );
    });
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendation fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});