// server/src/Controller/ControllerGerente.js (COM A LÓGICA CORRETA)

// Importamos a conexão 'db' já inicializada do nosso arquivo firebase.js
const { db } = require('../../firebase');

// Função de Login
exports.loginGerente = async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    const gerentesRef = db.collection('gerentes');
    const snapshot = await gerentesRef.where('matricula', '==', matricula).where('senha', '==', senha).get();

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Matrícula ou senha inválida' });
    }

    // Aqui você pode adicionar a lógica de gerar um token no futuro
    res.status(200).json({ message: 'Login realizado com sucesso' });

  } catch (error) {
    console.error('Erro no login do gerente:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// Adicione outras funções do gerente aqui no futuro...