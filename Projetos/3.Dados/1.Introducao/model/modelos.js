class Nota {
  // Construtor
  constructor(chave, titulo, texto, importancia) {
    this._chave = chave;
    this._titulo = titulo;
    this._texto = texto;
    this._importancia = importancia || 1;
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

  get lida() {
    return this._lida;
  }

  get importancia() { 
    return this._importancia; 
  }

  // Setters (para alterar os valores)
  set titulo(novoTitulo) {
    this._titulo = novoTitulo;
  }
  
  set texto(novoTexto) {
    this._texto = novoTexto;
  }
  
  set lida(status) {
    this._lida = status;
  }
  
  set importancia(novoValor) { 
    this._importancia = novoValor; 
  }
}

// Exporta a classe para que outros arquivos (como o notaMemoria) possam usá-la
module.exports = Nota;
