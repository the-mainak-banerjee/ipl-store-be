const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.route('/search').get(productController.getSearchedProducts);

router.route('/').get(productController.getAllProducts);

router.route('/:id').get(productController.getProduct);

module.exports = router;
