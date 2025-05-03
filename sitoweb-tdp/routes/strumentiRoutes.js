const express = require("express");
const router = express.Router();
const strumentiController = require("../controllers/strumentiController");

router.get("/", strumentiController.hub);
router.get("/imc", strumentiController.imcForm);
//router.post("/imc", strumentiController.imc);
router.get("/CalcolaKCal", strumentiController.CKCalForm);
//router.post("/CalcolaKCal", strumentiController.CKCal);
router.get("/timer", strumentiController.timer)

module.exports = router;