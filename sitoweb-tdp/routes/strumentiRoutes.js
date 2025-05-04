const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ImcData = require('../models/ImcData');
const strumentiController = require("../controllers/strumentiController");

// Applica il middleware addAuthStatus a tutte le route
router.use(auth.addAuthStatus);

router.get("/", strumentiController.hub);

// Route per la pagina IMC
router.get("/imc", strumentiController.imcForm);

// Route API per salvare i dati IMC (protetta da isAuthenticated)
router.post('/imc/save', auth.isAuthenticated, async (req, res) => {
    try {
        const { altezza, peso, imc, classificazione } = req.body;
        
        const imcRecord = await ImcData.create({
            userId: req.session.userId,
            altezza,
            peso,
            imc,
            classificazione
        });

        res.json({ success: true, data: imcRecord });
    } catch (error) {
        console.error('Errore salvataggio IMC:', error);
        res.status(500).json({ error: 'Errore nel salvataggio dei dati' });
    }
});

router.get("/CalcolaKCal", strumentiController.CKCalForm);

router.get("/timer", strumentiController.timer)

module.exports = router;