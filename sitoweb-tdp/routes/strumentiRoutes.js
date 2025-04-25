const express = require("express");
const router = express.Router();
const strumentiController = require("../controllers/strumentiController");

router.get("/IMC", strumentiController.imcForm);
router.post("/IMC", strumentiController.imc);
router.get("/CalcolaKCal", strumentiController.CKCalForm);
router.post("/CalcolaKCal", strumentiController.CKCal);