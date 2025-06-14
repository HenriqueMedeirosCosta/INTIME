const clienteModel = require('../Model/ClienteModel');

// Criar cliente
async function criarCliente(req, res) {
  const { nome, telefone, placa, servico, veiculo } = req.body;

  // Verifica se todos os campos obrigatórios foram enviados
  if (!nome || !telefone || !placa || !servico || !veiculo) {
    return res.status(400).json({
      success: false,
      message: 'Todos os campos (nome, telefone, placa, serviço e veículo) são obrigatórios.',
    });
  }

  try {
    const id = await clienteModel.adicionarCliente({ nome, telefone, placa, servico, veiculo });
    res.status(201).json({ success: true, message: 'Cliente adicionado com sucesso', id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao adicionar cliente', error });
  }
}

// Listar clientes
async function listarClientes(req, res) {
  try {
    const clientes = await clienteModel.listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao listar clientes', error });
  }
}

// Atualizar cliente
async function atualizarCliente(req, res) {
  const { id } = req.params;
  const dados = req.body;

  try {
    await clienteModel.atualizarCliente(id, dados);
    res.status(200).json({ success: true, message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar cliente', error });
  }
}

// Deletar cliente
async function deletarCliente(req, res) {
  const { id } = req.params;

  try {
    await clienteModel.removerCliente(id);
    res.status(200).json({ success: true, message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao remover cliente', error });
  }
}

module.exports = {
  criarCliente,
  listarClientes,
  atualizarCliente,
  deletarCliente,
};
