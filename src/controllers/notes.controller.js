// Controller appunti
const notesCtrl = {};
const Note = require("../models/Note");

// Nuovo appunto
notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

// Crea nuovo appunto
notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Scrivi un titolo!" });
  }
  if (!description) {
    errors.push({ text: "Scrivi una descrizione!" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Appunto aggiunto correttamente");
    res.redirect("/notes");
  }
};

// Tutti gli appunti
notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("notes/all-notes", { notes });
};

// Visualizza appunto
notesCtrl.renderViewNote = async(req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Autorizzazione negata");
    return res.redirect("/notes");
  }
  res.render("notes/view-note", { note });
}

// Modifca appunto
notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Autorizzazione negata");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

// Aggiorna dopo la modifica dell'appunto
notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Appunto modificato correttamente");
  res.redirect("/notes");
};

// Cancella appunto
notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Appunto cancellato correttamente");
  res.redirect("/notes");
};

module.exports = notesCtrl;
