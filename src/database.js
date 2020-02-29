const mongoose = require("mongoose");        // modulo per gestire MongoDB

// URI del database
const MONGODB_URI = 'mongodb+srv://daniele:unicam@progettopawmdaniele-o2c7f.mongodb.net/test';

// Connessione al database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("Database connesso"))
  .catch(err => console.error(err));
