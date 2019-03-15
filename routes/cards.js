const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/:userId', cardController.card_list);

module.exports = router;