const Nota = require('../model/modelos');

// A função GET apenas mostra o formulário
exports.cria_get = function(req, res) {
    contexto = {
        titulo_pagina: "Criação de uma nova nota"
    }
    res.render('criaNota', contexto);
};

// A função POST agora salva no banco
exports.cria_post = async function(req, res) {
    try {
        // Cria o objeto com os dados do formulário
        const nova_nota = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            importancia: Number(req.body.importancia),
            // O campo 'lida' tem valor padrão false no banco, não precisamos passar
            // O campo 'id' é auto-incremento, o banco gera sozinho
        }

        // Salva no banco de dados
        await Nota.create(nova_nota);

        // Redireciona para a home
        res.redirect('/');
        
    } catch (error) {
        console.error("Erro ao criar nota:", error);
        res.status(500).send("Erro ao salvar nota.");
    }
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
    texto: nota.texto,
    importancia: nota.importancia
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
    texto: nota.texto,
    importancia: nota.importancia
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
  var importancia = req.body.importancia;

  // Precisamos buscar a nota original para saber o status 'lida'
  var notaOriginal = await notas.consulta(chave);

  // atualiza a nota com a chave
  await notas.atualiza(chave, titulo, texto, notaOriginal.lida, importancia);

  // redireciona para a página de consulta da nota
  res.redirect('/nota/consulta/' + chave);
};


// Marca a nota como lida
exports.lida = async function(req, res) {
  var chave = req.params.chave_nota;
  // 1. Busca a nota para manter o titulo e texto originais
  var nota = await notas.consulta(chave);
  // 2. Atualiza passando true para o campo lida
  await notas.atualiza(chave, nota.titulo, nota.texto, true, nota.importancia);
  res.redirect('/');
};

// Marca a nota como não lida
exports.naolida = async function(req, res) {
  var chave = req.params.chave_nota;
  // 1. Busca a nota
  var nota = await notas.consulta(chave);
  // 2. Atualiza passando false para o campo lida
  await notas.atualiza(chave, nota.titulo, nota.texto, false, nota.importancia);
  res.redirect('/');
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
