const { getFirestore, collection, query, where, getDocs } = require('firebase/firestore');
const { firebaseApp } = require('../firebase');
const db = getFirestore(firebaseApp);

async function autenticarGerente(matricula, senha) {
  const q = query(
    collection(db, 'gerentes'),
    where('matricula', '==', matricula),
    where('senha', '==', senha)
  );

  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

module.exports = {
  autenticarGerente,
};
