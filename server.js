const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://jsonplaceholder.typicode.com", "https://httpbin.org"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for enhanced authentication
app.post('/api/auth', async (req, res) => {
  const { username, password } = req.body;
  
  // Simulate authentication logic
  setTimeout(() => {
    if (username && password) {
      res.json({
        success: true,
        token: Math.random().toString(36).substr(2, 9),
        user: { id: 1, name: username, role: 'security_analyst' },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  }, 1500);
});

// API endpoint for ML model status
app.get('/api/ml-status', (req, res) => {
  res.json({
    models_loaded: true,
    accuracy: (94 + Math.random() * 4).toFixed(1),
    last_training: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    samples_processed: Math.floor(12000 + Math.random() * 2000)
  });
});

app.listen(PORT, () => {
  console.log(`🛡️ SecureBank APK Guardian running on port ${PORT}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});
