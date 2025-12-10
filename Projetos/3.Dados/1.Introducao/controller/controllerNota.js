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
    try {
        // Pega o ID que vem na URL (ex: /nota/consulta/1)
        const id = req.params.id;

        // Busca a nota no banco pelo ID (Primary Key)
        const nota = await Nota.findByPk(id);

        // Se a nota existir, atualiza ela como lida e mostra na tela
        if (nota) {
            // Atualiza o status para lida: true
            await Nota.update(
                { lida: true },
                { where: { id: id } }
            );

            const contexto = {
                titulo_pagina: "Consulta a Nota",
                id: nota.id,
                titulo: nota.titulo,
                texto: nota.texto,
                importancia: nota.importancia,
                lida: true
            };

            res.render('consultaNota', contexto);
        } else {
            res.status(404).send("Nota não encontrada");
        }

    } catch (error) {
        console.error("Erro na consulta:", error);
        res.status(500).send("Erro ao consultar nota.");
    }
};

// cria e já exporta a função que será responsável pela alteração de nota (GET)
exports.altera_get = async function(req, res) {
    try {
        const id = req.params.id;
        const nota = await Nota.findByPk(id);

        if (nota) {
            const contexto = {
                titulo_pagina: "Altera a Nota",
                id: nota.id,
                titulo: nota.titulo,
                texto: nota.texto,
                importancia: nota.importancia,
                lida: nota.lida
            };
            res.render('alteraNota', contexto);
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error("Erro ao buscar para editar:", error);
        res.redirect('/');
    }
};

// cria e já exporta a função que será responsável pela alteração de nota (POST)
exports.altera_post = async function(req, res) {
    try {
        const id = req.params.id; // O ID vem da URL
        
        const nota_atualizada = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            importancia: Number(req.body.importancia),
            // O checkbox envia 'on' se marcado, ou undefined se desmarcado
            lida: req.body.status === 'on' ? true : false 
        }

        await Nota.update(nota_atualizada, { where: { id: id } });
        res.redirect('/');

    } catch (error) {
        console.error("Erro ao salvar edição:", error);
        res.status(500).send("Erro ao editar nota");
    }
};


// Marca a nota como lida
exports.lida = async function(req, res) {
    try {
        const id = req.params.id;
        // Atualiza apenas o campo 'lida' para true
        await Nota.update({ lida: true }, { where: { id: id } });
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao marcar como lida:", error);
        res.redirect('/');
    }
};

// Marca a nota como não lida
exports.naolida = async function(req, res) {
    try {
        const id = req.params.id;
        // Atualiza apenas o campo 'lida' para false
        await Nota.update({ lida: false }, { where: { id: id } });
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao marcar como não lida:", error);
        res.redirect('/');
    }
};

// cria e já exporta a função que será responsável pela exclusão da nota
exports.deleta = async function(req, res) {
    try {
        const id = req.params.id;
        // Remove o registro onde o ID corresponde
        await Nota.destroy({ where: { id: id } });
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao deletar:", error);
        res.redirect('/');
    }
};
