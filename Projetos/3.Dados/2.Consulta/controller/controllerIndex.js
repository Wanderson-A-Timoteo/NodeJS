const { Nota } = require('../model/modelos');
const { Op } = require('sequelize'); // Importante: Operadores de busca

exports.tela_principal = async function(req, res) {
    try {
        let notas;
        const termoBusca = req.body.busca; // Recebe o valor do input 'busca'

        if (termoBusca) {
            // Cenario A: Usuário pesquisou algo
            // slide 75: Op.substring equivale a LIKE '%termo%'
            notas = await Nota.findAll({
                where: {
                    titulo: { [Op.substring]: termoBusca }
                }
            });
        } else {
            // Cenario B: Acesso normal (Home) ou busca vazia
            notas = await Nota.findAll();
        }

        // Mapeia para objeto simples
        const notasSimples = notas.map(nota => nota.get({ plain: true }));

        res.render('index', {
            titulo_pagina: "Gerenciador de Notas",
            notas: notasSimples,
            termo: termoBusca // Envia de volta para manter no input (Slide 80)
        });

    } catch (error) {
        console.error("Erro ao carregar notas:", error);
        res.status(500).send("Erro ao buscar notas.");
    }
};

exports.sobre = function(req, res) {
    res.render('sobre', { titulo_pagina: "Sobre" });
};
