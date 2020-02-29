const express = require("express");
const router = express.Router();

// Controllers (Pagine principali)
const { renderIndex, renderContact } = require("../controllers/index.controller");

// Routes per le pagine principali:
// - Pagina iniziale
router.get("/", renderIndex);

// - Pagina contatti
router.get("/contact", renderContact);

module.exports = router;
