// importação da classe que gerencia as notas na memória
const notas = require('../model/notaMemoria.js');

// cria e já exporta a função que será responsável pela criação de nota (GET)
// Esta função trata a requisição GET, por isso o nome cria_get
exports.cria_get = async function(req, res) {
  let contexto = {
    titulo_pagina: "Criação de Nota",
  }
  // renderiza o arquivo criaNota.hbs, dentro da pasta view
  res.render('criaNota', contexto);
}

// cria e já exporta a função que será responsável pela criação de nota (POST)
exports.cria_post = async function(req, res) {
  // obtém as informações do formulário
  // O Express coloca os dados do POST em req.body
  var chave = req.body.chave;
  var titulo = req.body.titulo;
  var texto = req.body.texto;

  // cria a nota
  await notas.cria(chave, titulo, texto);

  // redireciona para a página principal
  res.redirect('/');
};
