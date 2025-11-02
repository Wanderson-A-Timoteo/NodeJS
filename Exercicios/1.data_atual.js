const http = require('node:http');

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {

  // obter data atual
  const data_atual = new Date(Date.now());
  // retorna string com data formatada para o formato brasileiro
  const data_formatada = data_atual.toLocaleDateString('pt-BR');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Resposta HTML que exibe a data formatada
  var resposta = `
      <html>
        <head>
            <meta charset="UTF-8">
            <title>Data Atual</title>
        </head>
        <body>
            <p>Página para exibir a data atualizada.</p>
            <p>Data atual: ${data_formatada}</p>
        </body>
      </html>`;
  
  res.end(resposta);
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});
