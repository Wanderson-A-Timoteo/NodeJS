var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js');

// Gerar Dados de Teste
router.get('/gerar', controllerNota.criarDados);

/* GET Cria Nota (formulário). */
router.get('/cria', controllerNota.cria_get);

/* POST Cria Nota (recebe dados). */
router.post('/cria', controllerNota.cria_post);

/* GET Consulta Nota. */
router.get('/consulta/:id', controllerNota.consulta);

/* GET Altera Nota (formulário). */
router.get('/altera/:id', controllerNota.altera_get);

/* POST Altera Nota (recebe dados). */
router.post('/altera/:id', controllerNota.altera_post);

/* GET Deleta Nota. */
router.get('/deleta/:id', controllerNota.deleta);

/* GET Marcar como Lida */
router.get('/lida/:id', controllerNota.lida);

/* GET Marcar como Não Lida */
router.get('/naolida/:id', controllerNota.naolida);

// GET Relatório
router.get('/relatorio', controllerNota.relatorios);

module.exports = router;
