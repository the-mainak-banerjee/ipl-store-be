const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createOrder,
  getAllOrdersForUser,
} = require('../controllers/orderController');

const router = express.Router();

router.use(verifyToken);
router.get('/', getAllOrdersForUser);
router.post('/create-order', createOrder);

module.exports = router;
