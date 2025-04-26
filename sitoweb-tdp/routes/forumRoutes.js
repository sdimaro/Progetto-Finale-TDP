const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const newsController = require("../controllers/newsletterController");

// Middleware per controllare se l'utente è loggato
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/auth/login");
}

// Rotte forum
router.get("/", forumController.list);
router.get("/new", isAuthenticated, forumController.newForm);
router.post("/new", isAuthenticated, forumController.create);
router.post("/:id/delete", forumController.delete);
router.get("/:id/edit", forumController.editForm);
router.post("/:id/comment", forumController.comment);
router.post("/:id", forumController.update);
router.get("/:id", forumController.show);
router.post("/send", newsController.subscribe);

module.exports = router;
