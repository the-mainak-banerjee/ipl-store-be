const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  updateCart,
  getCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

router.use(verifyToken);

router.get('/', getCart);
router.post('/update', updateCart);
router.delete('/clear', clearCart);
module.exports = router;
