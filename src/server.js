const express = require('express');               // modulo per gestire express
const exphbs = require('express-handlebars');     // modulo per integrare handlebars con express
const path = require('path');                     // modulo per gestione dei percorsi in un qualsiasi s.o.     
const methodOverride = require('method-override') // modulo per la gestione dell'eliminazione delle note
const session = require('express-session');       // modulo dove sono salvati i messaggi flash
const flash = require('connect-flash');           // modulo per gestire i messaggi flash (errore, successo..)
const passport = require('passport');             // modulo per la gestione degli accessi login durante la navigazione

const app = express();
require('./config/passport');

// Set della porta 3000
app.set('port', 3000);

// Set di 'hbs' come template dell'applicazione (in views)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Gestione dei middleware
app.use(express.urlencoded({extended: false}));       // conversione in json degli url
app.use(methodOverride('_method'));                   // metodo per l'eliminazione                      
app.use(session({                                     // gestione sessione messaggi flash
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());                      // gestione sessione utente
app.use(passport.session());       
app.use(flash());                                    // gestione messaggi flash

// Variabili globali per i messaggi flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Gestione delle routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/notes.routes'));

// Configurare la cartella public come statica, dove gestire velocemente i css e le img
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;