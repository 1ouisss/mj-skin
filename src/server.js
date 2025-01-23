import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

// Enable trust proxy
app.set('trust proxy', true);

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Configure CORS for specific origins
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.repl.co'] 
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Apply rate limiting to all routes
app.use(limiter);

app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// API routes
app.get('/api/recommendations', (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;

    // Input sanitization and validation
    const sanitizedSkinType = String(skinType).trim().replace(/[^a-zA-Z\s]/g, '');
    const sanitizedCondition = condition ? String(condition).trim().replace(/[^a-zA-Z\s]/g, '') : '';
    const sanitizedConcerns = concerns ? String(concerns).trim().replace(/[^a-zA-Z\s,]/g, '') : '';

    if (!sanitizedSkinType) {
      return res.status(400).json({ 
        error: 'Missing or invalid required parameter: skinType',
        details: 'Le type de peau est requis et doit être valide'
      });
    }

    // Validate against allowed values
    const allowedSkinTypes = ['Sèche', 'Grasse', 'Mixte', 'Sensible', 'Normale'];
    if (!allowedSkinTypes.includes(sanitizedSkinType)) {
      return res.status(400).json({
        error: 'Invalid skin type',
        details: 'Le type de peau spécifié n\'est pas valide'
      });
    }

    console.log('Processing recommendation request:', {
      params: { skinType, condition, concerns },
      timestamp: new Date().toISOString()
    });

    const recommendations = skincareData.filter(item => 
      item.skinType === skinType &&
      (!condition || item.condition === condition) &&
      (!concerns || item.concerns.includes(concerns))
    );

    if (!recommendations.length) {
      return res.status(404).json({ 
        error: 'No recommendations found',
        details: 'Aucune recommandation trouvée pour ces critères'
      });
    }

    console.log('Sending recommendations:', {
      count: recommendations.length,
      timestamp: new Date().toISOString()
    });

    res.json(recommendations);
  } catch (error) {
    console.error('Recommendation error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    res.status(500).json({ 
      error: 'Internal server error',
      details: 'Une erreur interne est survenue'
    });
  }
});

// SPA catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
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