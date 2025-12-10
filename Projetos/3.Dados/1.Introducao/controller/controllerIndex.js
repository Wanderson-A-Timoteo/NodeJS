const Nota = require('../model/modelos'); // Importa o modelo do Sequelize

// Crie e já exporta a função que será responsável por renderizar a tela principal
exports.tela_principal = async function(req, res) {
    try {
        // Busca todas as notas no banco de dados (SELECT * FROM Nota), utilizando Sequelize
        const notas = await Nota.findAll();

        // Converte os dados do Sequelize para objetos simples que o Handlebars entende
        // O método .map percorre a lista e o .get({ plain: true }) limpa os metadados
        const notasSimples = notas.map(nota => nota.get({ plain: true }));

        const contexto = {
            titulo_pagina: "Gerenciador de Notas de Texto",
            notas: notasSimples
        };

        // Renderiza a view 'index.hbs'
        res.render('index', contexto);

    } catch (error) {
        console.error("Erro ao carregar notas:", error);
        res.status(500).send("Erro ao buscar notas no banco de dados.");
    }
};

// Mantém a função 'sobre'sem alterações
exports.sobre = function(req, res) {
    res.render('sobre', { titulo_pagina: "Sobre" });
};
