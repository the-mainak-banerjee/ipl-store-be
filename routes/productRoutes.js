const express = require('express');

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'All products here',
  });
});

router.route('/:slug').get((req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: 'Get a product based on its slug',
  });
});

module.exports = router;
