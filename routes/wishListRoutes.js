const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  addToWishlist,
  getWishlist,
} = require('../controllers/wishListController');

const router = express.Router();

router.use(verifyToken);
router.get('/', getWishlist);
router.post('/add-to-wishlist', addToWishlist);

module.exports = router;
