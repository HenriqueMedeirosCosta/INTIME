const express = require('express');
const router = express.Router();
const clienteController = require('../Controller/ControllerCliente'); // Ajuste o caminho conforme sua estrutura


router.post('/', clienteController.cadastrarCliente);
//router.get('/', clienteController.listarCliente);
router.get('/:id', clienteController.buscarCliente);
//router.delete('/:id', clienteController.deletarCliente);
router.put('/:id', clienteController.atualizarStatus);

module.exports = router;

