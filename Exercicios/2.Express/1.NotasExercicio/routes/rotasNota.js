var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js');

/* GET Cria Nota (formulário). */
router.get('/cria', controllerNota.cria_get);

/* POST Cria Nota (recebe dados). */
router.post('/cria', controllerNota.cria_post);

/* GET Consulta Nota. */
router.get('/consulta/:chave_nota', controllerNota.consulta);

/* GET Altera Nota (formulário). */
router.get('/altera/:chave_nota', controllerNota.altera_get);

/* POST Altera Nota (recebe dados). */
router.post('/altera/:chave_nota', controllerNota.altera_post);

/* GET Deleta Nota. */
router.get('/deleta/:chave_nota', controllerNota.deleta);

/* GET Marcar como Lida */
router.get('/lida/:chave_nota', controllerNota.lida);

/* GET Marcar como Não Lida */
router.get('/naolida/:chave_nota', controllerNota.naolida);

module.exports = router;
