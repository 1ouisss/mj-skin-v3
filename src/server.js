import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

const app = express();

app.set('trust proxy', 1);

// Basic security
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(cors());
app.use(express.json());

// Serve static files
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// API routes
app.get('/api/recommendations', (req, res) => {
  try {
    const { skinType, condition, concerns } = req.query;
    const skincareData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'skincare-db.json'), 'utf8')
    );

    const recommendations = skincareData.filter(item => 
      item.skinType === skinType &&
      (!condition || item.condition === condition) &&
      (!concerns || item.concerns.includes(concerns))
    );

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// SPA catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shutting down');
    process.exit(0);
  });
});