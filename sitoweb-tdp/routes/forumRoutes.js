const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const newsController = require("../controllers/newsletterController");

// Middleware per controllare se l'utente è loggato
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    // Modificato da req.isAuthenticated()
    return next();
  }
  res.redirect("/auth/login");
}

// Rotte forum
router.get("/", forumController.list);
// Applica il middleware alle rotte che richiedono autenticazione
router.get("/new", isAuthenticated, forumController.newForm);
router.post("/new", isAuthenticated, forumController.create);

router.get("/:id", forumController.show);
router.post("/send", newsController.subscribe);

module.exports = router;
