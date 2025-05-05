const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const strumentiController = require("../controllers/strumentiController");

// Applica il middleware addAuthStatus a tutte le route
router.use(auth.addAuthStatus);

router.get("/", strumentiController.hub);

// Route per la pagina IMC
router.get("/imc", strumentiController.imcForm);

// Route API per salvare i dati IMC (protetta da isAuthenticated)
router.post("/imc/save", auth.isAuthenticated, strumentiController.imcSend);

router.get("/CalcolaKCal", strumentiController.CKCalForm);

router.get("/timer", strumentiController.timer);

module.exports = router;
