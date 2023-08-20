const express = require('express');
const morgan = require('morgan');

const productRoutes = require('./routes/productRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/products', productRoutes);

module.exports = app;
