const express = require('express');
const morgan = require('morgan');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware to parse the request body
app.use(express.json());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

module.exports = app;
