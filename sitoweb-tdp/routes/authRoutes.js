const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rotte per il login e la registrazione
router.get("/login", userController.loginForm);
router.post("/login", userController.login);
router.get("/register", userController.registerForm);
router.post("/register", userController.register);
router.get("/logout", userController.logout);

module.exports = router;
