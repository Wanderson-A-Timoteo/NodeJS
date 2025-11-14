var express = require('express');
var router = express.Router();
var controllerNota = require('../controller/controllerNota.js');

/* GET Cria Nota (formulário). */
router.get('/cria', controllerNota.cria_get);

/* POST Cria Nota (recebe dados). */
router.post('/cria', controllerNota.cria_post);

module.exports = router;
