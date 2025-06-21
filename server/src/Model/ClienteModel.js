// server/src/Model/ClienteModel.js (VERSÃO FINAL COM SENHA SEQUENCIAL)

const { db } = require('../../firebase');

/**
 * Gera a próxima senha sequencial para o dia atual usando uma transação segura.
 * Cria uma coleção 'contadores' para armazenar o último número de cada dia.
 * @returns {Promise<number>} A próxima senha disponível.
 */
async function gerarProximaSenha() {
  // Pega a data de hoje no formato YYYY-MM-DD (ex: 2025-06-20)
  const hoje = new Date().toISOString().split('T')[0];
  
  // Cria uma referência para o documento do contador de hoje
  const contadorRef = db.collection('contadores').doc(hoje);

  try {
    // Executa uma transação para garantir a atomicidade (operação segura)
    const novaSenha = await db.runTransaction(async (transaction) => {
      const contadorDoc = await transaction.get(contadorRef);

      if (!contadorDoc.exists) {
        // Se for o primeiro atendimento do dia, a senha é 1.
        transaction.set(contadorRef, { ultimaSenha: 1 });
        return 1;
      } else {
        // Se já existem atendimentos, incrementa a última senha.
        const ultimaSenha = contadorDoc.data().ultimaSenha;
        const proximaSenha = ultimaSenha + 1;
        transaction.update(contadorRef, { ultimaSenha: proximaSenha });
        return proximaSenha;
      }
    });

    return novaSenha;

  } catch (error) {
    console.error("Erro ao gerar senha sequencial:", error);
    // Em caso de falha na transação, gera uma senha aleatória como fallback.
    return Math.floor(1000 + Math.random() * 9000);
  }
}

const Cliente = {
  criarCliente: async (dadosCliente) => {
    // 1. Gera a próxima senha disponível
    const novaSenha = await gerarProximaSenha();

    // 2. Prepara o documento completo para ser salvo no Firestore
    const novoCliente = {
      ...dadosCliente,
      senha: novaSenha,
      status: 'Aguardando', // Define o status inicial
      timestamp: new Date()    // Adiciona a data/hora do cadastro para ordenação
    };
    
    // 3. Adiciona o novo cliente à coleção 'clientes'
    const docRef = await db.collection('clientes').add(novoCliente);

    // 4. [CORREÇÃO] Retorna um objeto com o ID e a SENHA para o frontend
    return {
      id: docRef.id,
      senha: novaSenha
    };
  },

  // Suas outras funções continuam aqui...
  buscarDadosPorSenha: async (senha) => {
    const clientesRef = db.collection('clientes');
    const snapshot = await clientesRef.where('senha', '==', senha).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  atualizarStatus: async (id, status) => {
    const clienteRef = db.collection('clientes').doc(id);
    await clienteRef.update({ status: status });
    return true;
  },
};

module.exports = Cliente;