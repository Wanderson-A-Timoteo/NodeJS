const http = require('node:http');

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  // Roteador principal
  if (req.url === '/') {
    paginaPrincipal(req, res);
  } else if (req.url === '/data') {
    paginaData(req, res);
  } else if (req.url === '/hora') {
    paginaHora(req, res);
  } else if (req.url === '/datahora') {
    paginaDataHora(req, res);
  } else {
    // Rota 404 (Não Encontrado)
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Caminho não encontrado: ${req.url}`);
  }
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});

// --- Funções de cada página ---

// Rota: /
function paginaPrincipal(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Aplicação Data/Hora</title>
      </head>
      <body>
          <h1>Aplicação Data/Hora.</h1>
          <p>Aqui é possível consulta a data e/ou hora atual</p>
          <ul>
              <li><a href="/data">Consultar a Data Atual</a></li>
              <li><a href="/hora">Consultar a Hora Atual</a></li>
              <li><a href="/datahora">Consultar a Data e Hora Atual</a></li>
          </ul>
      </body>
    </html>
  `);
}

// Rota: /data
function paginaData(req, res) {
  const data_atual = new Date();
  const data_formatada = data_atual.toLocaleDateString('pt-BR');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Data Atual</title>
      </head>
      <body>
          <h1>Página para exibir a data atual.</h1>
          <p>Data atual: ${data_formatada}</p>
      </body>
    </html>
  `);
}

// Rota: /hora
function paginaHora(req, res) {
  const data_atual = new Date();
  // Dica do professor: usar toLocaleTimeString() [cite: 667]
  const hora_formatada = data_atual.toLocaleTimeString('pt-BR');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Hora Atual</title>
      </head>
      <body>
          <h1>Página para exibir a hora atual.</h1>
          <p>Hora atual: ${hora_formatada}</p>
      </body>
    </html>
  `);
}

// Rota: /datahora
function paginaDataHora(req, res) {
  const data_atual = new Date();
  const data_formatada = data_atual.toLocaleDateString('pt-BR');
  const hora_formatada = data_atual.toLocaleTimeString('pt-BR');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Data e Hora Atual</title>
      </head>
      <body>
          <h1>Página para exibir a data e hora atual.</h1>
          <p>Data e hora atual: ${data_formatada} - ${hora_formatada}</p>
      </body>
    </html>
  `);
}
