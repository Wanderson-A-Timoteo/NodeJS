// controller/controllerIndex.js

// importação da classe que gerencia as notas na memória
const notas = require('../model/notaMemoria.js');

// cria e já exporta a função que será responsável pela tela principal
exports.tela_principal = async function (req, res) {
  //nota criada para teste
  await notas.cria('nota_1', "Olá Mundo, Notas", "Esta é uma nota para testar as funcionalidades da aplicação de notas.");

  // Prepara o "contexto" para enviar para a View
  let contexto = {
    titulo_pagina: "Gerenciador de Notas de Texto",
    notas: await notas.lista(),
  };

  // renderiza o arquivo index.hbs, dentro da pasta view, e passa o contexto
  res.render('index', contexto);
};

// cria e já exporta a função que será responsável pela página Sobre
exports.sobre = async function(req, res) {
  let contexto = {
    titulo_pagina: "Sobre o Aplicativo",
  }
  // renderiza o arquivo sobre.hbs, dentro da pasta view
  res.render('sobre', contexto);
}
