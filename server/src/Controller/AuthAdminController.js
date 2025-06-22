const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, senha } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminSenha = process.env.ADMIN_SENHA;

  if (email === adminEmail && senha === adminSenha) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }

  return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
};
