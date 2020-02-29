// Controller pagine principali
const indexCtrl = {};

// Pagina iniziale
indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

// Pagina contatti
indexCtrl.renderContact = (req, res) => {
  res.render('contact');
};

module.exports = indexCtrl;