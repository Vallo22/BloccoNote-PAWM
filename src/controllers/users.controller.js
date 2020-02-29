// Controller utente
const usersCtrl = {};
const User = require('../models/User');
const passport = require("passport");

// Registrazione
usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

// Effettuare registrazione
usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (name.length == 0 || email.length == 0 || password.length == 0 || confirm_password == 0) {
    errors.push({ text: "Credenziali mancanti. Inserire le credenziali richieste."})
  }
  if (password != confirm_password) {
    errors.push({ text: "Le password non corrispondono." });
  }
  if (name.length > 15) {
    errors.push({ text: "Il nome non può contenere più di 15 caratteri."})
  }
  if (password.length < 4) {
    errors.push({ text: "La password deve contenere almeno 4 caratteri." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Email gia in uso
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "L'email è gia in uso.");
      res.redirect("/users/signup");
    } else {
      // Registrazione nuovo utente
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registrazione avvenuta con successo.");
      res.redirect("/users/signin");
    }
  }
};

// Accedi
usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

// Effettuare accesso al sito
usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: ("Email o password errata.")
});

// Uscire dall'account
usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sei uscito dal tuo account.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;