const express = require('express');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data: 'Signup successful',
  });
});

router.post('/login', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Login successful',
  });
});

module.exports = router;
