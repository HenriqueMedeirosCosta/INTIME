const express = require('express');
const router = express.Router();
const db = require('../../firebase');  // importa o firebase.js

// LISTAR todos os clientes 
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.ref('clientes').once('value');
        const data = snapshot.val() || {};
        const clientes = Object.entries(data).map(([id, cliente]) => ({ id, ...cliente }));
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// CRIAR novo cliente
router.post('/', async (req, res) => {
    const { nome, carro, placa, tipoServico, telefone } = req.body;

    if (!nome || !carro || !placa || !tipoServico || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const novoCliente = { nome, carro, placa, tipoServico, telefone, status: "Aguardando" };

    try {
        const ref = db.ref('clientes').push();
        await ref.set(novoCliente);
        res.status(201).json({ id: ref.key, ...novoCliente });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

// BUSCAR cliente por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const snapshot = await db.ref(`clientes/${id}`).once('value');
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json({ id, ...snapshot.val() });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

// ATUALIZAR status do cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status é obrigatório para atualização' });
    }

    try {
        const clienteRef = db.ref(`clientes/${id}`);
        const snapshot = await clienteRef.once('value');

        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        await clienteRef.update({ status });
        res.json({ id, ...snapshot.val(), status });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// DELETAR cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const clienteRef = db.ref(`clientes/${id}`);
        const snapshot = await clienteRef.once('value');

        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        await clienteRef.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
});

module.exports = router;
