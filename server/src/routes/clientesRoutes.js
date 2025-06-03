const express = require('express');
const router = express.Router();

let clientes = [
  { id: 1, nome: 'João', email: 'joao@email.com' },
  { id: 2, nome: 'Maria', email: 'maria@email.com' }
];

router.get('/', (req, res) => {
  res.json(clientes);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(cliente);
});

router.post('/', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }
  const id = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
  const novoCliente = { id, nome, email };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  const clienteIndex = clientes.findIndex(c => c.id === id);
  if (clienteIndex === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  if (!nome && !email) {
    return res.status(400).json({ error: 'Informe pelo menos nome ou email para atualizar' });
  }

  if (nome) clientes[clienteIndex].nome = nome;
  if (email) clientes[clienteIndex].email = email;

  res.json(clientes[clienteIndex]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex(c => c.id === id);
  if (clienteIndex === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  clientes.splice(clienteIndex, 1);
  res.status(204).send();
});

module.exports = router;
