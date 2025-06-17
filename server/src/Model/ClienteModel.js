const db = require('../../firebase');

async function criarCliente(dadosCliente) {
  const { nome, telefone, carro, placa, servico } = dadosCliente;

  const clientesSnapshot = await db.collection('clientes').get();

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
    throw new Error('Telefone já cadastrado');
  }

  if (existePlaca) {
    throw new Error('Placa já cadastrada');
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

  await db.collection('clientes').add(novoCliente);

  return {
    message: 'Cliente cadastrado com sucesso!',
    senha: novaSenha
  };
}

async function buscarDocumentoPorSenha(senha) {
  const senhaNum = parseInt(senha);
  const snapshot = await db.collection('clientes')
    .where('senha', '==', senhaNum)
    .limit(1)
    .get();

  return snapshot.empty ? null : snapshot.docs[0];
}

async function buscarDadosPorSenha(senha) {
  const doc = await buscarDocumentoPorSenha(senha);
  return doc ? { id: doc.id, ...doc.data() } : null;
}

async function atualizarStatus(id, novoStatus) {
    const docRef = await buscarDocumentoPorSenha(id)
    console.log("docRef: " , docRef);

    if(!docRef.exists) return false;

    await docRef.ref.update({status: novoStatus });
    return true;
}

module.exports = {
  criarCliente,
  buscarDadosPorSenha,
  buscarDocumentoPorSenha,
  atualizarStatus
};
