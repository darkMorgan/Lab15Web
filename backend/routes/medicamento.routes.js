const express = require("express");
const router = express.Router();
const medicamentoController = require("../controllers/medicamento.controller");

router.get("/", medicamentoController.getAll);
router.post("/", medicamentoController.create);

router.put("/:id", medicamentoController.update);
router.delete("/:id", medicamentoController.delete);


module.exports = router;
