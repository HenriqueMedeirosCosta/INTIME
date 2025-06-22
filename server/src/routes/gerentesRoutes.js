const express = require('express');
const router = express.Router();
const controller = require('../Controller/ControllerGerente');
const ControllerCliente = require('../Controller/ControllerCliente');
const auth = require('../Controller/AuthAdminController');
const verificarToken = require('../Middleware/verificarToken'); 
// Rota pública para login
router.post('/login', auth.login);

// Rotas protegidas
router.use(verificarToken);  
router.post('/fila', controller.iniciarFila);
router.get('/resumo', controller.obterResumoFila);
router.get('/clientes', controller.listarTodosClientes);
router.get('/clientes/:id', ControllerCliente.buscarCliente);
router.put('/clientes/:id', controller.atualizarCliente);
router.put('/clientes/editar/:id', controller.finalizarAtendimento);
router.delete('/clientes', controller.resetarBanco);
router.get('/relatorio', controller.gerarRelatorioExcel);

module.exports = router;
