const express = require('express');
const router = express.Router();
const approfondimentiController = require('../controllers/approfondimentiController');

// Rotte per gli approfondimenti
router.get('/', approfondimentiController.renderApprofondimenti);

module.exports = router;