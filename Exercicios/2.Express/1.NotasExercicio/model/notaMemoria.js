var Nota = require("./modelos.js");

const lista_notas = {};

class NotaMemoria {

    // Atualiza agora recebe (e preserva) o status 'lida'
    async atualiza(chave, titulo, texto, lida) {
        // Se 'lida' não for passado, mantém o valor antigo se existir, ou false
        let statusAtual = lista_notas[chave] ? lista_notas[chave].lida : false;
        if (lida !== undefined) {
            statusAtual = lida;
        }

        var novaNota = new Nota(chave, titulo, texto);
        novaNota.lida = statusAtual; // Define o status
        
        lista_notas[chave] = novaNota;
        return lista_notas[chave];
    }

    async cria(chave, titulo, texto) {
        var novaNota = new Nota(chave, titulo, texto);
        novaNota.lida = false; // Padrão: não lida [cite: 1751]
        lista_notas[chave] = novaNota;
        return lista_notas[chave];
    }

    async consulta(chave) {
        if (lista_notas[chave]) return lista_notas[chave];
        else throw new Error(`Nota com a chave ${chave} não existe`);
    }

    async deleta(chave) {
        if (lista_notas[chave]) {
            delete lista_notas[chave];
        } else throw new Error(`Nota com a chave ${chave} não existe`);
    }

    async lista() {
        return Object.values(lista_notas);
    }
}

var notas = new NotaMemoria();

module.exports = notas;