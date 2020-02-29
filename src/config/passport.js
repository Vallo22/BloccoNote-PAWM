const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); 

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Confrontare e-mail
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Utente non trovato.' });
  } else {
    // Confrontare le password
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password errata.' });
    }
  }
}));

// Gestione del salvataggio dell'user.id nella sessione attuale (cookie)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
