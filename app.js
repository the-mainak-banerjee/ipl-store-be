const express = require('express');

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use('/api/v1/products', productRoutes);

module.exports = app;
