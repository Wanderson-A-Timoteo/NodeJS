var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex');

/* GET home page. */
router.get('/', controllerIndex.tela_principal);

/* POST home page (Pesquisa) */
router.post('/', controllerIndex.tela_principal);

/* GET Sobre */
router.get('/sobre', controllerIndex.sobre);

module.exports = router;
