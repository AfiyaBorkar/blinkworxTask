const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const next = require("next");
const path = require('path');
require('dotenv').config();

// Import routes
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');

// Determine environment
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: path.resolve(__dirname, "./ecommerce-frontend") });
const handle = nextApp.getRequestHandler();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up Next.js to handle frontend
nextApp.prepare().then(() => {
  // API Routes
  app.use('/api/orders', orderRoutes); // Connect order routes to /api/orders
  app.use('/api/products', productRoutes); // Connect product routes to /api/products

  // Serve static files from Next.js public folder
  app.use(express.static(path.resolve(__dirname, './ecommerce-frontend/public')));

  // Base route (optional API endpoint)
  app.get('/api', (req, res) => {
    res.send('Welcome to the E-commerce API');
  });

  // Delegate all other routes to Next.js
  app.all('*', (req, res) => {
    return handle(req, res); // Delegate requests to Next.js
  });

  // 404 handler for unknown routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Error starting server:", err);
});
