var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js');

/* GET home page. */
router.get('/', controllerIndex.tela_principal);

/* POST home page (Para a Pesquisa) */
router.post('/', controllerIndex.tela_principal);

/* GET página sobre */
router.get('/sobre', controllerIndex.sobre);

module.exports = router;
