const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');

const { firebaseApp } = require('../firebase');
const db = getFirestore(firebaseApp);

// Adicionar novo cliente
async function adicionarCliente(cliente) {
  const docRef = await addDoc(collection(db, 'clientes'), cliente);
  return docRef.id;
}

// Listar todos os clientes
async function listarClientes() {
  const snapshot = await getDocs(collection(db, 'clientes'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Atualizar cliente por ID
async function atualizarCliente(id, dadosAtualizados) {
  const clienteRef = doc(db, 'clientes', id);
  await updateDoc(clienteRef, dadosAtualizados);
}

// Remover cliente por ID
async function removerCliente(id) {
  const clienteRef = doc(db, 'clientes', id);
  await deleteDoc(clienteRef);
}

module.exports = {
  adicionarCliente,
  listarClientes,
  atualizarCliente,
  removerCliente,
};
