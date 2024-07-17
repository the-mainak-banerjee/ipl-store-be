const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { addAdress, removeAddress } = require('../controllers/userController');

const router = express.Router();

router.use(verifyToken);
router.post('/addAddress', addAdress);
router.delete('/removeAddress', removeAddress);

module.exports = router;
