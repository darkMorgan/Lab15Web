const express = require("express");
const router = express.Router();
const { TipoMedic } = require("../models");

router.get("/", async (req, res) => {
  const tipos = await TipoMedic.findAll();
  res.json(tipos);
});

module.exports = router;
