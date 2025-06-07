const express = require('express');
const router = express.Router();
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const { firebaseApp } = require('../../firebase'); // Certifique-se que isso exporta `firebaseApp`

const db = getFirestore(firebaseApp);

router.post('/', async (req, res) => {
  const { nome, telefone, carro, placa, servico } = req.body;

  try {
    // Obter todos os documentos da coleção "clientes"
    const clientesSnapshot = await getDocs(collection(db, 'clientes'));

    let existeTelefone = false;
    let existePlaca = false;
    let maiorSenha = 999;

    clientesSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.telefone === telefone) existeTelefone = true;
      if (data.placa === placa) existePlaca = true;
      if (typeof data.senha === 'number' && data.senha > maiorSenha) {
        maiorSenha = data.senha;
      }
    });

    if (existeTelefone) {
      return res.status(400).json({ message: 'Telefone já cadastrado' });
    }

    if (existePlaca) {
      return res.status(400).json({ message: 'Placa já cadastrada' });
    }

    const novaSenha = maiorSenha + 1;

    const novoCliente = {
      nome,
      telefone,
      carro,
      placa,
      servico,
      status: 'Aguardando',
      senha: novaSenha,
      dataCadastro: new Date()
    };

    await addDoc(collection(db, 'clientes'), novoCliente);

    return res.status(201).json({
      message: 'Cliente cadastrado com sucesso!',
      senha: novaSenha
    });

  } catch (error) {
    console.error('❌ Erro ao cadastrar cliente:', error);
    return res.status(500).json({
      error: 'Erro ao cadastrar cliente',
      details: error.message
    });
  }
});

module.exports = router;
