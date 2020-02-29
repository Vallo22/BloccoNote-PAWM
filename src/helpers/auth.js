const helpers = {};

// Classe per la gestione delle autorizzazioni in caso di autenticazione o non autenticazione
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Autorizzazione negata.');
  res.redirect('/users/signin');
};

module.exports = helpers;
