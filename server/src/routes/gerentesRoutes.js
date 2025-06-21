const express = require('express');
const router = express.Router();
const { getFirestore, collection, getDocs, query, where, doc, updateDoc } = require('firebase/firestore');
const { firebaseApp } = require('../../firebase');

const db = getFirestore(firebaseApp);

// Login do gerente
router.post('/login', async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    const snapshot = await getDocs(
      query(collection(db, 'gerentes'), where('matricula', '==', matricula), where('senha', '==', senha))
    );

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Matrícula ou senha inválida' });
    }

    return res.json({ message: 'Login realizado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no login', details: error.message });
  }
});

// Ver veículos na fila (status Aguardando)
router.get('/fila', async (req, res) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, 'clientes'), where('status', '==', 'Aguardando'))
    );

    const fila = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.json(fila);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar fila', details: error.message });
  }
});

// Selecionar veículo para atendimento
router.patch('/:id/atender', async (req, res) => {
  const { id } = req.params;

  try {
    await updateDoc(doc(db, 'clientes', id), { status: 'Em atendimento' });
    return res.json({ message: 'Veículo em atendimento' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao iniciar atendimento', details: error.message });
  }
});

// Finalizar atendimento de veículo
router.patch('/:id/finalizar', async (req, res) => {
  const { id } = req.params;

  try {
    await updateDoc(doc(db, 'clientes', id), { status: 'Finalizado' });
    return res.json({ message: 'Atendimento finalizado' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao finalizar atendimento', details: error.message });
  }
});

module.exports = router;
