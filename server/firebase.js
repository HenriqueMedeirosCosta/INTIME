// server/firebase.js (VERSÃO CORRETA COM ADMIN SDK)

const admin = require('firebase-admin');

// O Admin SDK usa a chave de serviço que você já tem
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Inicializamos o Firestore aqui, uma única vez
const db = admin.firestore();

// Exportamos a instância 'db' já pronta para ser usada
module.exports = { db };