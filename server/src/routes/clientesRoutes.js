const express = require('express');
const router = express.Router();
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const { firebaseApp } = require('../../firebase'); // Certifique-se que isso exporta `firebaseApp`

const db = getFirestore(firebaseApp);

router.post('/', async (req, res) => {
  const { nome, telefone, carro, placa, servico } = req.body;

  try {
    const clientesSnapshot = await getDocs(collection(db, 'clientes'));

    let existeTelefone = false;
    let existePlaca = false;
    let maiorSenha = 0;

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

router.get('/:senha', async (req, res) => {
  const senha = req.params.senha;
  console.log('[GET /clientes/:senha] Senha recebida:', senha);

  try {
    const doc = await db.collection('clientes').doc(senha).get();

    if (!doc.exists) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    const dadosCliente = doc.data();
    console.log('[Firestore] Cliente encontrado:', dadosCliente);
    res.json(dadosCliente);

  } catch (erro) {
    console.error('[Erro Firestore]', erro);
    res.status(500).json({ erro: 'Erro ao buscar cliente' });
  }
});


module.exports = router;
