// server/src/routes/gerentesRoutes.js (VERSÃO SIMPLIFICADA)

const express = require('express');
const router = express.Router();

// Importamos nosso controller que contém a lógica
const gerenteController = require('../Controller/ControllerGerente');

// A rota POST /login agora chama a função loginGerente do nosso controller
router.post('/login', gerenteController.loginGerente);

// No futuro, as outras rotas virão aqui:
// router.get('/fila', controller.getFila);
// router.patch('/:id/atender', controller.atenderVeiculo);

module.exports = router;