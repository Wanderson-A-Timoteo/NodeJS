const http = require('node:http');

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  // Verifica a URL da requisição
  if (req.url === '/') { //requisição página principal
    paginaPrincipal(req, res);
  
  } else if (req.url === '/sobre') { //requisição página "Sobre"
    paginaSobre(req, res);
  
  } else {
    // Se a URL não for '/' ou '/sobre', retorna 404
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Não foi possível acessar o caminho: ${req.url}`);
  }
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});

// Função que envia a Página Principal
function paginaPrincipal(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  // Envia o HTML da página principal e finaliza a resposta
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Página Principal</title>
      </head>
      <body>
          <h1>Exemplo Node.js com mais de uma página.</h1>
          <p><a href='/sobre'>Sobre esta Página</a></p>
      </body>
    </html>
  `);
}

// Função que envia a Página Sobre
function paginaSobre(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  // Envia o HTML da página sobre e finaliza a resposta
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Página Sobre</title>
      </head>
      <body>
          <h1>Informações sobre a página.</h1>
      </body>
    </html>
  `);
}
