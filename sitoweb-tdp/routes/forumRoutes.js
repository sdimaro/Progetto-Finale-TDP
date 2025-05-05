const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const newsController = require("../controllers/newsletterController");
const { isAuthenticated } = require("../middlewares/auth");

// Rotte forum
router.get("/", forumController.list);
router.get("/new", isAuthenticated, forumController.newForm);
router.post("/new", isAuthenticated, forumController.create);
router.post("/send", newsController.subscribe);
router.post("/:id/delete", forumController.delete);
router.get("/:id/edit", forumController.editForm);
router.post("/:id/comment", forumController.comment);
router.post("/:id", forumController.update);
router.get("/:id", forumController.show);

module.exports = router;
