var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota');

// Rota para Gerar Dados
router.get('/gerar', controllerNota.criarDados);

// Rota para Relatórios
router.get('/relatorio', controllerNota.relatorios);

// Rota para Notas Importantes
router.get('/importantes', controllerNota.importantes);

// Rotas de Criação
router.get('/cria', controllerNota.cria_get);
router.post('/cria', controllerNota.cria_post);

// Rotas de Consulta, Edição e Exclusão
router.get('/consulta/:id', controllerNota.consulta);
router.get('/lida/:id', controllerNota.lida);
router.get('/naolida/:id', controllerNota.naolida);
router.get('/altera/:id', controllerNota.altera_get);
router.post('/altera/:id', controllerNota.altera_post);
router.get('/deleta/:id', controllerNota.deleta);

module.exports = router;
