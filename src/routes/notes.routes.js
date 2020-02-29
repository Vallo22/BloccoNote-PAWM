const express = require("express");
const router = express.Router();

// Controller (Appunti)
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderViewNote,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/notes.controller");

// Helpers (Autenticazione)
const { isAuthenticated } = require("../helpers/auth");

// Routes per appunti tramite controller:
// - Nuovo appunto
router.get("/notes/add", isAuthenticated, renderNoteForm);
router.post("/notes/new-note", isAuthenticated, createNewNote);

// - Tutti gli appunti
router.get("/notes", isAuthenticated, renderNotes);

// - Visualizza appunto
router.get("/notes/view-note/:id", isAuthenticated, renderViewNote);

// - Modifica appunto
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// - Cancella appunto
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
