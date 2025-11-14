// importação da classe Nota no arquivo "modelos.js"
var Nota = require("./modelos.js");

const lista_notas = {}; //será um vetor de objetos do tipo Nota

class NotaMemoria {
  // métodos assincronos para simular os métodos de um ORM
  async atualiza(chave, titulo, texto) {
    lista_notas[chave] = new Nota(chave, titulo, texto);
    return lista_notas[chave];
  }

  async cria(chave, titulo, texto) {
    lista_notas[chave] = new Nota(chave, titulo, texto);
    return lista_notas[chave];
  }

  async consulta(chave) {
    if (lista_notas[chave]) return lista_notas[chave];
    // CORRIGIDO: Adicionado o '}' faltante
    else throw new Error(`Nota com a chave ${chave} não existe`);
  }

  async deleta(chave) {
    if (lista_notas[chave]) {
      delete lista_notas[chave];
    // CORRIGIDO: Adicionado o '}' faltante
    } else throw new Error(`Nota com a chave ${chave} não existe`);
  }

  async lista() {
    return Object.values(lista_notas);
  }
}

// cria um objeto do tipo NotaMemoria que será utilizado para gerenciar as notas
var notas = new NotaMemoria();
module.exports = notas;
