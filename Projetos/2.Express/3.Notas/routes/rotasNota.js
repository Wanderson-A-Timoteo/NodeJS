var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js');

/* GET Cria Nota (formulário). */
router.get('/cria', controllerNota.cria_get);

/* POST Cria Nota (recebe dados). */
router.post('/cria', controllerNota.cria_post);

/* GET Consulta Nota. */
router.get('/consulta/:chave_nota', controllerNota.consulta);

module.exports = router;
