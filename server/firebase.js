const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');  


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://in-time-9eed9-default-rtdb.firebaseio.com'  
});

const db = admin.firestore();

module.exports = db;
