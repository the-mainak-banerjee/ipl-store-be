const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      app: 'Ipl Store',
    },
  });
});

module.exports = app;
