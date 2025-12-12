const Nota = require('../model/modelos'); // Importa o modelo Mongoose

// --- MÉTODOS DE CRUD (Adaptação para Mongoose) ---

// CRIAÇÃO
exports.cria_get = function(req, res) {
    res.render('criaNota', { titulo_pagina: "Criação de uma nova nota" });
};

exports.cria_post = async function(req, res) {
    try {
        // Mongoose não precisa converter 'importancia' para Number manualmente,
        // o Schema faz isso, mas manter é seguro.
        const nova_nota = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            importancia: req.body.importancia 
            // campo 'lida' usa o valor padrão (false) definido no Schema
        }
        
        // Mongoose: create (mesmo nome do Sequelize, mas comportamento NoSQL)
        await Nota.create(nova_nota);
        
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao criar:", error);
        res.status(500).send("Erro ao criar nota: " + error.message);
    }
};

// CONSULTA DETALHADA
exports.consulta = async function(req, res) {
    try {
        const id = req.params.id;
        
        // Mongoose: findById busca pelo _id
        // .lean() converte para objeto JS simples (substitui o dataValues)
        const nota = await Nota.findById(id).lean();

        if (nota) {
            // Mongoose: updateOne para atualizar um documento específico
            await Nota.updateOne(
                { _id: id }, // Filtro
                { lida: true } // Atualização
            );

            const contexto = {
                titulo_pagina: "Consulta a Nota",
                // Usamos nota directly pois usamos .lean()
                id: nota._id, 
                titulo: nota.titulo,
                texto: nota.texto,
                importancia: nota.importancia,
                lida: true
            };
            res.render('consultaNota', contexto);
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error("Erro na consulta:", error);
        res.redirect('/');
    }
};

// ALTERAR STATUS
exports.lida = async function(req, res) {
    try {
        await Nota.updateOne({ _id: req.params.id }, { lida: true });
        res.redirect('/');
    } catch (error) { res.redirect('/'); }
};

exports.naolida = async function(req, res) {
    try {
        await Nota.updateOne({ _id: req.params.id }, { lida: false });
        res.redirect('/');
    } catch (error) { res.redirect('/'); }
};

// DELETAR 
exports.deleta = async function(req, res) {
    try {
        // Mongoose: deleteOne
        await Nota.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) { res.redirect('/'); }
};

// EDIÇÃO 
exports.altera_get = async function(req, res) {
    try {
        const id = req.params.id;
        const nota = await Nota.findById(id).lean();

        if (nota) {
            res.render('alteraNota', {
                titulo_pagina: "Altera a Nota",
                id: nota._id,
                titulo: nota.titulo,
                texto: nota.texto,
                importancia: nota.importancia,
                lida: nota.lida
            });
        } else { res.redirect('/'); }
    } catch (error) { res.redirect('/'); }
};

exports.altera_post = async function(req, res) {
    try {
        const nota_atualizada = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            importancia: req.body.importancia,
            lida: req.body.status === 'on' ? true : false
        }
        
        // Mongoose: updateOne com filtro pelo _id
        await Nota.updateOne({ _id: req.params.id }, nota_atualizada);
        
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao editar:", error);
        res.status(500).send("Erro ao editar");
    }
};

// --- FUNÇÕES NÃO ADAPTADAS AINDA (Placeholders para não quebrar a rota) ---
exports.relatorios = (req, res) => res.send("Funcionalidade em manutenção para NoSQL");
exports.importantes = (req, res) => res.send("Funcionalidade em manutenção para NoSQL");
exports.criarDados = (req, res) => res.send("Povoamento desativado no NoSQL");
