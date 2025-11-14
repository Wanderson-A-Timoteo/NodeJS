var express = require('express');
var router = express.Router();
// 1. Importa o nosso novo controller
var controllerIndex = require('../controller/controllerIndex.js');

/* GET home page. */
// 2. Aponta a rota GET / para a função tela_principal do controller
router.get('/', controllerIndex.tela_principal);

module.exports = router;
