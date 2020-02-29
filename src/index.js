require('dotenv').config();
const app = require('./server');
require('./database');

// Server in ascolto sulla porta scelta in 'server.js'
app.listen(app.get('port'), () => {
  console.log('Server in ascolto sulla porta', app.get('port'));
});