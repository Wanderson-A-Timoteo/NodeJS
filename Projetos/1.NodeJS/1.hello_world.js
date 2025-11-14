// importa o módulo http para processar requisições http
const http = require('node:http');

// especifica IP e porta a serem utilizadas
const hostname = '127.0.0.1';
const porta = 3000;

//cria o servidor http
const server = http.createServer((req, res) => {
  //prepara o cabeçalho da resposta
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // "escreve" ou envia dados
  res.write("Olá Mundo!\n");
  
  // finaliza a conexão
  res.end();
});

//configura o endereço e porta do servidor e ativa o servidor
server.listen(porta, hostname, () => {
  //exibe uma mensagem informado que o servidor está pronto
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});
