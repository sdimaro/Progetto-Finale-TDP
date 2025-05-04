const express = require('express');
const router = express.Router();
const articoliController = require('../controllers/articoliController');

// Pagina elenco articoli
router.get('/', articoliController.elencoArticoli);

// Pagine singoli articoli
router.get('/superfoods-mediterranei', articoliController.superfoodsMediterranei);
router.get('/meditazione-principianti', articoliController.meditazionePrincipianti);
router.get('/esercizi-corpo-libero', articoliController.eserciziCorpoLibero);

module.exports = router;