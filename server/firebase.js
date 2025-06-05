const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');  // Ajuste o nome se necessário

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://in-time-9eed9-default-rtdb.firebaseio.com'  // Confirme esse URL no console do Firebase!
});

const db = admin.database();

module.exports = db;
