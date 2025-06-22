const db = require('../../firebase');

async function iniciarFila() {
  const data = {
    nome: "Início da Fila",
    telefone: "000000000",
    carro: "Padrão",
    placa: "AAAAAAA",
    servico: "Inicialização",
    status: "Aguardando atendimento",
    senha: 1000,
    dataCadastro: new Date()
  };

  try {
    await db.collection('clientes').add(data);
    return true;
  } catch (error) {
    console.error("Erro ao iniciar a fila:", error);
    return false;
  }
}
// Criar um novo cliente
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

  if (existeTelefone) throw new Error('Telefone já cadastrado');
  if (existePlaca) throw new Error('Placa já cadastrada');

  const novaSenha = maiorSenha + 1;
      const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

  const novoCliente = {
    nome,
    telefone,
    carro,
    placa,
    servico,
    status: 'Aguardando',
    senha: novaSenha,
    dataCadastro: horaFormatada
  };

  await db.collection('clientes').add(novoCliente);

  return {
    message: 'Cliente cadastrado com sucesso!',
    senha: novaSenha
  };
}

// Buscar documento Firestore pelo número da senha
async function buscarDocumentoPorSenha(senha) {
  const senhaNum = parseInt(senha);
  const snapshot = await db.collection('clientes')
    .where('senha', '==', senhaNum)
    .limit(1)
    .get();

  return snapshot.empty ? null : snapshot.docs[0];
}

// Buscar apenas os dados do cliente
async function buscarDadosPorSenha(senha) {
  const doc = await buscarDocumentoPorSenha(senha);
  return doc ? { id: doc.id, ...doc.data() } : null;
}

// Atualizar status do cliente pela senha
async function atualizarStatus(senha, novoStatus) {
  const docRef = await buscarDocumentoPorSenha(senha);
  if (!docRef) return false;

  await docRef.ref.update({ status: novoStatus });
  return true;
}

// Listar todos os clientes
async function listarTodos() {
  const snapshot = await db.collection('clientes').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Atualizar qualquer dado do cliente
async function atualizarCliente(senha, novosDados) {
  const doc = await buscarDocumentoPorSenha(senha);
  if (!doc) return false;

  await doc.ref.update(novosDados);
  return true;
}

// Deletar todos os clientes
async function deletarTodos() {
  const snapshot = await db.collection('clientes').get();
  const batch = db.batch();

  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

// Escutar em tempo real (útil no admin)
function escutarClientesTempoReal(callback) {
  return db.collection('clientes').onSnapshot(snapshot => {
    const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(dados);
  });
}

module.exports = {
  iniciarFila,
  criarCliente,
  buscarDocumentoPorSenha,
  buscarDadosPorSenha,
  atualizarStatus,
  listarTodos,
  atualizarCliente,
  deletarTodos,
  escutarClientesTempoReal
};
