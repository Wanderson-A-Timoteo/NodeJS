// controller/controllerIndex.js
const Nota = require('../model/modelos'); // Importa o modelo Mongoose

exports.tela_principal = async function(req, res) {
    try {
        let notas;
        const termoBusca = req.body.busca;

        // Se for um POST com busca
        if (req.method === 'POST') {
            if (!termoBusca || termoBusca.trim() === '') {
                // Se a busca estiver vazia, redireciona para limpar (Slide 33)
                return res.redirect('/');
            }

            // Pesquisa usando o índice de texto criado no modelo (Slide 20)
            notas = await Nota.find(
                { $text: { $search: termoBusca } }
            ).lean();
        } 
        else {
            // Acesso normal (GET): Traz tudo
            notas = await Nota.find({}).lean();
        }

        res.render('index', {
            titulo_pagina: "Gerenciador de Notas (NoSQL)",
            notas: notas,
            termo: termoBusca
        });

    } catch (error) {
        console.error("Erro ao buscar:", error);
        res.status(500).send("Erro ao pesquisar notas.");
    }
};

exports.sobre = function(req, res) {
    res.render('sobre', { titulo_pagina: "Sobre" });
};
