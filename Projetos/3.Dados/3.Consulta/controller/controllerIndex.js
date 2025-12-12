const Nota = require('../model/modelos');

exports.tela_principal = async function(req, res) {
    try {
        let notas;
        // Variáveis para manter o estado dos checkboxes na view
        let filtros = {}; 

        if (req.method === 'POST') {
            
            // --- CENÁRIO A: FILTRO AVANÇADO (Offcanvas) ---
            if (req.body.acao === 'filtrar') {
                const criteria = []; // Array de critérios para o $and

                // 1. Filtro de Status (Lida/Não Lida)
                const statusList = [];
                if (req.body.lida) statusList.push(true);
                if (req.body.naolida) statusList.push(false);
                
                // Se algum checkbox de status foi marcado, adiciona ao filtro
                if (statusList.length > 0) {
                    criteria.push({ lida: { $in: statusList } });
                }

                // 2. Filtro de Importância
                const impList = [];
                if (req.body.imp1) impList.push(1);
                if (req.body.imp2) impList.push(2);
                if (req.body.imp3) impList.push(3);
                if (req.body.imp4) impList.push(4);
                if (req.body.imp5) impList.push(5);

                if (impList.length > 0) {
                    criteria.push({ importancia: { $in: impList } });
                }

                // Monta a query final
                // Se tiver critérios, usa $and. Se não, busca tudo (objeto vazio)
                const query = criteria.length > 0 ? { $and: criteria } : {};
                
                notas = await Nota.find(query).lean();

                // Salva estado para devolver à view (manter marcado)
                filtros = {
                    filtro_lida: req.body.lida,
                    filtro_naolida: req.body.naolida,
                    filtro_imp1: req.body.imp1,
                    filtro_imp2: req.body.imp2,
                    filtro_imp3: req.body.imp3,
                    filtro_imp4: req.body.imp4,
                    filtro_imp5: req.body.imp5
                };
            } 
            
            // --- CENÁRIO B: PESQUISA TEXTUAL ---
            else if (req.body.busca) {
                notas = await Nota.find({ $text: { $search: req.body.busca } }).lean();
            } 
            
            // --- CENÁRIO C: POST VAZIO (Limpar) ---
            else {
                return res.redirect('/');
            }

        } else {
            // --- CENÁRIO D: GET NORMAL (Home) ---
            notas = await Nota.find({}).lean();
        }

        res.render('index', {
            titulo_pagina: "Gerenciador de Notas (NoSQL)",
            notas: notas,
            termo: req.body.busca,
            ...filtros // Espalha as variáveis de filtro no contexto
        });

    } catch (error) {
        console.error("Erro ao carregar:", error);
        res.status(500).send("Erro ao carregar notas.");
    }
};

exports.sobre = function(req, res) {
    res.render('sobre', { titulo_pagina: "Sobre" });
};
