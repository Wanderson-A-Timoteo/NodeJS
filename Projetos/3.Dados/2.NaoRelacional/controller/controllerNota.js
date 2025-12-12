const { Nota, Usuario, Tag } = require('../model/modelos');
const { Op } = require('sequelize'); // <--- Importante para filtros (gte, substring)

// --- POVOAMENTO DE DADOS ---
exports.criarDados = async function(req, res) {
    try {
        await Nota.destroy({ where: {} });
        await Tag.destroy({ where: {} });
        await Usuario.destroy({ where: {} });

        const users = await Usuario.bulkCreate([
            { nome: "Alice", sobrenome: "Costa", email: "alice@email.com.br" },
            { nome: "Ricardo", sobrenome: "Silva", email: "ricardo@email.com.br" },
            { nome: "Mariana", sobrenome: "Oliveira", email: "mariana@email.com.br" }
        ]);

        const tags = await Tag.bulkCreate([
            { tag: "Trabalho", cor: "#0dbeffff" },
            { tag: "Pessoal", cor: "#ffc043ff" },
            { tag: "Urgente", cor: "#ff3033ff" }
        ]);

        const n1 = await Nota.create({ titulo: "Comprar mantimentos", texto: "Leite, pão, ovos...", importancia: 1, usuario_id: users[0].id });
        await n1.addTag(tags[1]);

        const n2 = await Nota.create({ titulo: "Reunião com a equipe", texto: "Discutir progresso...", importancia: 5, usuario_id: users[0].id });
        await n2.addTags([tags[0], tags[2]]);

        const n3 = await Nota.create({ titulo: "Ligar para o encanador", texto: "Vazamento na cozinha", importancia: 4, usuario_id: users[0].id });
        await n3.addTags([tags[1], tags[2]]);

        const n4 = await Nota.create({ titulo: "Consulta médica", texto: "Check-up anual", importancia: 4, usuario_id: users[1].id });
        await n4.addTag(tags[1]);

        const n5 = await Nota.create({ titulo: "Preparar apresentação", texto: "Slides conferência", importancia: 5, usuario_id: users[1].id });
        await n5.addTag(tags[0]);

        const n6 = await Nota.create({ titulo: "Renovar seguro do carro", texto: "Verificar opções", importancia: 3, usuario_id: users[1].id });
        await n6.addTag(tags[2]);

        const n7 = await Nota.create({ titulo: "Planejar viagem", texto: "Reservar voos", importancia: 2, usuario_id: users[2].id });
        await n7.addTag(tags[1]);

        const n8 = await Nota.create({ titulo: "Pagar contas", texto: "Energia, água...", importancia: 4, usuario_id: users[2].id });
        await n8.addTag(tags[2]);

        const n9 = await Nota.create({ titulo: "Aula de yoga", texto: "Participar online", importancia: 1, usuario_id: users[2].id });
        await n9.addTag(tags[1]);

        res.redirect('/');
    } catch (error) {
        console.error("Erro ao gerar dados:", error);
        res.status(500).send("Erro ao gerar dados: " + error.message);
    }
};

// --- RELATÓRIOS ---
exports.relatorios = async function(req, res) {
    try {
        const totalUsuarios = await Usuario.count();
        const totalNotas = await Nota.count();
        const totalTags = await Tag.count();

        const usuarios = await Usuario.findAll({ include: Nota });
        const dadosUsuarios = usuarios.map(u => {
            const notasDoUsuario = u.Notas || u.Nota || [];
            return {
                nome: `${u.nome} ${u.sobrenome || ''}`.trim(),
                qtd: notasDoUsuario.length
            };
        });

        const tags = await Tag.findAll({ include: Nota });
        const dadosTags = tags.map(t => {
            const notasDaTag = t.Notas || t.Nota || [];
            return {
                tag: t.tag,
                cor: t.cor,
                qtd: notasDaTag.length
            };
        });

        res.render('relatorio', {
            titulo_pagina: "Relatório do Sistema",
            totalUsuarios, totalNotas, totalTags, dadosUsuarios, dadosTags
        });
    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        res.status(500).send("Erro ao gerar relatório");
    }
};

// --- NOTAS IMPORTANTES (NOVA FUNÇÃO) ---
exports.importantes = async function(req, res) {
    try {
        const notas = await Nota.findAll({
            where: {
                importancia: { [Op.gte]: 4 } // Maior ou igual a 4
            },
            order: [['importancia', 'DESC']]
        });

        const notasSimples = notas.map(nota => nota.get({ plain: true }));

        res.render('importantes', {
            titulo_pagina: "Notas com Maior Importância",
            notas: notasSimples
        });
    } catch (error) {
        console.error("Erro ao buscar importantes:", error);
        res.status(500).send("Erro ao buscar notas importantes");
    }
};

// --- CRUD: CRIAÇÃO ---
exports.cria_get = function(req, res) {
    res.render('criaNota', { titulo_pagina: "Criação de uma nova nota" });
};

exports.cria_post = async function(req, res) {
    try {
        const nova_nota = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            importancia: Number(req.body.importancia),
            usuario_id: 1 // Hardcoded Alice
        }
        await Nota.create(nova_nota);
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao criar:", error);
        res.status(500).send("Erro ao criar nota");
    }
};

// --- CRUD: CONSULTA DETALHADA ---
exports.consulta = async function(req, res) {
    try {
        const id = req.params.id;
        const nota = await Nota.findByPk(id, {
            include: [{ model: Usuario }, { model: Tag }]
        });

        if (nota) {
            await Nota.update({ lida: true }, { where: { id: id } });
            const notaSimples = nota.get({ plain: true });
            const contexto = {
                titulo_pagina: "Consulta a Nota",
                id: notaSimples.id,
                titulo: notaSimples.titulo,
                texto: notaSimples.texto,
                importancia: notaSimples.importancia,
                lida: true,
                usuario: notaSimples.Usuario,
                tags: notaSimples.Tags
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

// --- CRUD: ALTERAÇÃO E EXCLUSÃO ---
exports.lida = async function(req, res) {
    try {
        await Nota.update({ lida: true }, { where: { id: req.params.id } });
        res.redirect('/');
    } catch (error) { res.redirect('/'); }
};

exports.naolida = async function(req, res) {
    try {
        await Nota.update({ lida: false }, { where: { id: req.params.id } });
        res.redirect('/');
    } catch (error) { res.redirect('/'); }
};

exports.deleta = async function(req, res) {
    try {
        await Nota.destroy({ where: { id: req.params.id } });
        res.redirect('/');
    } catch (error) { res.redirect('/'); }
};

exports.altera_get = async function(req, res) {
    try {
        const nota = await Nota.findByPk(req.params.id);
        if (nota) {
            res.render('alteraNota', {
                titulo_pagina: "Altera a Nota",
                id: nota.id,
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
            importancia: Number(req.body.importancia),
            lida: req.body.status === 'on' ? true : false
        }
        await Nota.update(nota_atualizada, { where: { id: req.params.id } });
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao editar:", error);
        res.status(500).send("Erro ao editar");
    }
};
