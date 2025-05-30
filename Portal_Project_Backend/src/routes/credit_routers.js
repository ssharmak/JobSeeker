const express = require('express');
const { authenticateTempToken } = require('../middleware/authMiddleware');
const { addCredits } = require('../controllers/creditController');

const router = express.Router();

router.post('/add-credits',authenticateTempToken,addCredits);

module.exports = router;