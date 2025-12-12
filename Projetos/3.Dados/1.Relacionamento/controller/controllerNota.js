const { Nota, Usuario, Tag } = require('../model/modelos');

// Função cria dados de teste no banco
exports.criarDados = async function(req, res) {
    try {
        // Criar Usuários
        const users = await Usuario.bulkCreate([
            { nome: "Alice", sobrenome: "Costa", email: "alice@email.com.br" },
            { nome: "Ricardo", sobrenome: "Silva", email: "ricardo@email.com.br" },
            { nome: "Mariana", sobrenome: "Oliveira", email: "mariana@email.com.br" }
        ]);

        // Criar Tags
        const tags = await Tag.bulkCreate([
            { tag: "Trabalho", cor: "#0dbeffff" },
            { tag: "Pessoal", cor: "#ffc043ff" },
            { tag: "Urgente", cor: "#ff3033ff" }
        ]);

        // Criar Notas e Associar
        // Nota 1 (Alice)
        const n1 = await Nota.create({ titulo: "Comprar mantimentos", texto: "Leite, pão, ovos...", importancia: 1, usuario_id: 1 });
        await n1.addTag(tags[1]); // Pessoal

        // Nota 2 (Alice)
        const n2 = await Nota.create({ titulo: "Reunião com a equipe", texto: "Discutir progresso...", importancia: 5, usuario_id: 1 });
        await n2.addTags([tags[0], tags[2]]); // Trabalho, Urgente

        // Nota 3 (Alice)
        const n3 = await Nota.create({ titulo: "Ligar para o encanador", texto: "Vazamento na cozinha", importancia: 4, usuario_id: 1 });
        await n3.addTags([tags[1], tags[2]]); // Pessoal, Urgente

        // Nota 4 (Ricardo)
        const n4 = await Nota.create({ titulo: "Consulta médica", texto: "Check-up anual", importancia: 4, usuario_id: 2 });
        await n4.addTag(tags[1]); // Pessoal

        // Nota 5 (Ricardo)
        const n5 = await Nota.create({ titulo: "Preparar apresentação", texto: "Slides conferência", importancia: 5, usuario_id: 2 });
        await n5.addTag(tags[0]); // Trabalho

        // Nota 6 (Ricardo)
        const n6 = await Nota.create({ titulo: "Renovar seguro do carro", texto: "Verificar opções", importancia: 3, usuario_id: 2 });
        await n6.addTag(tags[2]); // Urgente

        // Nota 7 (Mariana)
        const n7 = await Nota.create({ titulo: "Planejar viagem", texto: "Reservar voos", importancia: 2, usuario_id: 3 });
        await n7.addTag(tags[1]); // Pessoal

        // Nota 8 (Mariana)
        const n8 = await Nota.create({ titulo: "Pagar contas", texto: "Energia, água...", importancia: 4, usuario_id: 3 });
        await n8.addTag(tags[2]); // Urgente

        // Nota 9 (Mariana)
        const n9 = await Nota.create({ titulo: "Aula de yoga", texto: "Participar online", importancia: 1, usuario_id: 3 });
        await n9.addTag(tags[1]); // Pessoal

        res.redirect('/');

    } catch (error) {
        console.error("Erro ao gerar dados:", error);
        res.status(500).send("Erro ao gerar dados de teste: " + error.message);
    }
};


// A função GET apenas mostra o formulário
exports.cria_get = function(req, res) {
    res.render('criaNota', { titulo_pagina: "Criação de uma nova nota" });
};

// A função POST agora salva no banco
exports.cria_post = async function(req, res) {
    try {
        // ATENÇÃO: Hardcoded usuario_id: 1 (Alice) por enquanto, 
        // pois a tela de criação ainda não seleciona usuário.
        const nova_nota = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            importancia: Number(req.body.importancia),
            usuario_id: 1 
        }
        await Nota.create(nova_nota);
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao criar:", error);
        res.status(500).send("Erro ao criar nota");
    }
};

// Cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function(req, res) {
    try {
        const id = req.params.id;

        // Buscando Nota com seus RELACIONAMENTOS (JOIN)
        const nota = await Nota.findByPk(id, {
            include: [
                { model: Usuario }, // Traz os dados do Usuário dono
                { model: Tag }      // Traz a lista de Tags associadas
            ]
        });

        if (nota) {
            // Marca como lida
            await Nota.update({ lida: true }, { where: { id: id } });

            // Converte para objeto simples para o Handlebars
            const notaSimples = nota.get({ plain: true });

            const contexto = {
                titulo_pagina: "Consulta a Nota",
                // Passamos os dados diretos do objeto simples
                id: notaSimples.id,
                titulo: notaSimples.titulo,
                texto: notaSimples.texto,
                importancia: notaSimples.importancia,
                lida: true,
                // NOVOS DADOS PARA A VIEW:
                usuario: notaSimples.Usuario, // Objeto usuário
                tags: notaSimples.Tags        // Array de tags
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

// Cria e já exporta a função que será responsável pela alteração de nota (GET)
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

// Cria e já exporta a função que será responsável pela alteração de nota (POST)
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

// Cria e já exporta a função que será responsável pela exclusão da nota
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
