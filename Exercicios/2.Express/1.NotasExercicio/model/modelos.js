class Nota {
  // O construtor é onde as propriedades são inicializadas
  constructor(chave, titulo, texto) {
    this._chave = chave;
    this._titulo = titulo;
    this._texto = texto;
    this._lida = false;
  }

  // Getters (para ler os valores)
  get chave() {
    return this._chave;
  }

  get titulo() {
    return this._titulo;
  }

  get texto() {
    return this._texto;
  }

  // Setters (para alterar os valores)
  set titulo(novoTitulo) {
    this._titulo = novoTitulo;
  }

  set texto(novoTexto) {
    this._texto = novoTexto;
  }

  get lida() {
    return this._lida;
  }
  
  set lida(status) {
    this._lida = status;
  }
}

// Exporta a classe para que outros arquivos (como o notaMemoria) possam usá-la
module.exports = Nota;
