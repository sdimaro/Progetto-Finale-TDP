const express = require('express');
const router = express.Router();
const ApiController = require('../webServer/apiController');

// Middleware per verificare i dati in input
const { validateIMCData, validateCalorieData } = require('../middlewares/validationMiddleware');

// Rotta per il calcolo IMC
router.post('/imc', validateIMCData, ApiController.calcolaIMC);

// Rotta per il calcolo del fabbisogno calorico
router.post('/calorie', validateCalorieData, ApiController.calcolaCalorie);

router.get('/docs', (req, res) => {
    res.render('webservice/docs');
});

module.exports = router;
