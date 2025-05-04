const express = require('express');
const router = express.Router();
const contattiController = require('../controllers/contattiController');

// Mostra la pagina contatti
router.get('/', contattiController.showContatti);

// Gestisce l'invio del form
router.post('/', contattiController.handleContactForm);

module.exports = router;