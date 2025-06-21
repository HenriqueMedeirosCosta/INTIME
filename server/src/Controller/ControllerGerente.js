const gerenteModel = require('../models/gerenteModel');

async function loginGerente(req, res) {
  const { matricula, senha } = req.body;

  try {
    const autenticado = await gerenteModel.autenticarGerente(matricula, senha);

    if (autenticado) {
      res.status(200).json({ success: true, message: 'Login realizado com sucesso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
}

module.exports = {
  loginGerente,
};
