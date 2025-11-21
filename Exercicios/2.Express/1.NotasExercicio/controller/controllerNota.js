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

// cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function(req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave); // Chama o model

  // Prepara o contexto para a view
  let contexto = {
    titulo_pagina: "Consulta a Nota",
    chave: nota.chave,
    titulo: nota.titulo,
    texto: nota.texto
  };

  // renderiza o arquivo dentro da pasta view
  res.render('consultaNota', contexto);
};

// cria e já exporta a função que será responsável pela alteração de nota (GET)
exports.altera_get = async function(req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave); // Busca a nota existente

  // Prepara o contexto para a view
  let contexto = {
    titulo_pagina: "Altera a Nota",
    chave: nota.chave,
    titulo: nota.titulo,
    texto: nota.texto
  };

  // renderiza o arquivo alteraNota.hbs, dentro da pasta view, com os dados da nota
  res.render('alteraNota', contexto);
};

// cria e já exporta a função que será responsável pela alteração de nota (POST)
exports.altera_post = async function(req, res) {
  // obtem as informações do formulário
  var chave = req.body.chave;
  var titulo = req.body.titulo;
  var texto = req.body.texto;

  // atualiza a nota com a chave
  await notas.atualiza(chave, titulo, texto);

  // redireciona para a página de consulta da nota
  res.redirect('/nota/consulta/' + chave);
};

// cria e já exporta a função que será responsável pela exclusão da nota
exports.deleta = async function(req, res) {
    //informação passada como parâmetro na url
    var chave = req.params.chave_nota;
    
    // chama o método do model para deletar
    await notas.deleta(chave);
    
    // redireciona para a página principal
    res.redirect('/');
};

// Marca a nota como lida
exports.lida = async function(req, res) {
    var chave = req.params.chave_nota;
    // 1. Busca a nota para manter o titulo e texto originais
    var nota = await notas.consulta(chave);
    // 2. Atualiza passando true para o campo lida
    await notas.atualiza(chave, nota.titulo, nota.texto, true);
    res.redirect('/');
};

// Marca a nota como não lida
exports.naolida = async function(req, res) {
    var chave = req.params.chave_nota;
    // 1. Busca a nota
    var nota = await notas.consulta(chave);
    // 2. Atualiza passando false para o campo lida
    await notas.atualiza(chave, nota.titulo, nota.texto, false);
    res.redirect('/');
};
