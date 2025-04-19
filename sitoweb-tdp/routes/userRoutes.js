const express = require("express");
const router = express.Router();
const healthController = require("../controllers/userController");

// READ - lista di tutti gli argomenti
router.get("/", healthController.list);

// CREATE - mostra form per aggiungere nuovo argomento
router.get("/new", healthController.newForm);

// CREATE - salva nuovo argomento
router.post("/", healthController.create);

// READ - mostra dettaglio di un argomento specifico
router.get("/:id", healthController.show);

// UPDATE - mostra form per modificare un argomento
router.get("/:id/edit", healthController.editForm);

// UPDATE - aggiorna l'argomento
router.post("/:id", healthController.update); // possiamo poi passare a PUT con override

// DELETE - elimina un argomento
router.post("/:id/delete", healthController.delete); // possiamo poi passare a DELETE con override

module.exports = router;
