const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");

// Middleware per controllare se l'utente è loggato
/*
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}
*/
// Rotte forum
router.get("/", forumController.list);
router.get("/new", forumController.newForm);
router.post("/new", forumController.create);
router.get("/:id", forumController.show);

module.exports = router;
