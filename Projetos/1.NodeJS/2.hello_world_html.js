// importa o módulo http para processar requisições http
const http = require('node:http');

// especifica IP e porta a serem utilizadas
const hostname = '127.0.0.1';
const porta = 3000;

//cria o servidor http
const server = http.createServer((req, res) => {
  //prepara o cabeçalho da resposta
  res.statusCode = 200;
  // Define o tipo de conteúdo como HTML e o charset como UTF-8
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Variável com o conteúdo HTML da resposta
  var resposta = `
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Olá Mundo HTML</title>
      </head>
      <body>
          <p>Olá Mundo HTML</p>
      </body>
    </html>`;

  // "escreve" ou envia a resposta
  res.write(resposta);
  
  // finaliza a conexão
  res.end();
});

//configura o endereço e porta do servidor e ativa o servidor
server.listen(porta, hostname, () => {
  //exibe uma mensagem informado que o servidor está pronto
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});
