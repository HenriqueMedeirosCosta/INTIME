const Cliente = require('../Model/ClienteModel');

exports.cadastrarCliente = async (req, res) => {
  try {
    const dadosCliente = req.body;
    const resultado = await Cliente.criarCliente(dadosCliente);
    return res.status(201).json(resultado);
  } catch (error) {
    if (error.message === 'Telefone já cadastrado' || error.message === 'Placa já cadastrada') {
      return res.status(400).json({ erro: error.message });
    }
    console.error('Erro ao cadastrar cliente:', error);
    return res.status(500).json({ erro: 'Erro interno ao cadastrar cliente' });
  }
};

exports.buscarCliente = async (req, res) => {
  const senha = parseInt(req.params.id);
 
  try {
    const cliente = await Cliente.buscarDadosPorSenha(senha);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    return res.json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return res.status(500).json({ erro: 'Erro interno ao buscar cliente' });
  }
};

exports.atualizarStatus = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;
  console.log("teste de id e req.params: ", req.body)

  try{
    const cancelado = await Cliente.atualizarStatus(id, status);
    if(!cancelado) return res.status(404).json({ erro: 'não foi possivel cancelar seu atendimento'});
    res.json({ message: 'Atendimento cancelado!'});
  }catch (error) {
    console.error('[Erro CancelarAtendimento]', error);
    res.status(500).json({ erro: 'Erro ao cancelar atendimento.'});
  }
};