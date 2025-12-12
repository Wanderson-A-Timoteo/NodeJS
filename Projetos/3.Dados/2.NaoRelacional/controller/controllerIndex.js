// controller/controllerIndex.js
const Nota = require('../model/modelos'); // Importa o modelo Mongoose

exports.tela_principal = async function(req, res) {
    try {
        // Mongoose: .find({}) busca todos os documentos (filtro vazio)
        // .lean() converte para objeto JS puro (opcional, mas boa prática para performance)
        const notas = await Nota.find({}).lean();

        const contexto = {
            titulo_pagina: "Gerenciador de Notas de Texto",
            notas: notas
        };

        res.render('index', contexto);

    } catch (error) {
        console.error("Erro ao carregar notas:", error);
        res.status(500).send("Erro ao buscar notas no MongoDB.");
    }
};

exports.sobre = function(req, res) {
    res.render('sobre', { titulo_pagina: "Sobre" });
};
