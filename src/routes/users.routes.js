const router = require("express").Router();

// Controller (Gestione Utente)
const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Routes per utente tramite controller:
// - Registrazione
router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", singup);

// - Accesso
router.get("/users/signin", renderSigninForm);
router.post("/users/signin", signin);

// - Disconnessione
router.get("/users/logout", logout);

module.exports = router;
