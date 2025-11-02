const http = require('node:http');
const url = require('node:url');

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  // Roteador
  // O .startsWith() é usado para o caso da URL ter parâmetros, como /pedido?nome=...
  if (req.url.startsWith('/formulario')) { //requisição página "Formulário"
    paginaFormulario(req, res);
  } else if (req.url.startsWith('/pedido')) { //requisição página que irá processar o pedido
    paginaPedido(req, res);
  } else {
    paginaPrincipal(req, res); // Rota padrão (/)
  }
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});

// --- Funções de cada página ---

// Rota: / (Padrão)
function paginaPrincipal(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8">
          <title>Página Principal</title>
      </head>
      <body>
          <h1>Exemplo Node.js com formulário.</h1>
          <p>Acesse o Formulário de Pedidos <a href='/formulario'>aqui</a></p>
      </body>
    </html>
  `);
}

// Rota: /formulario
function paginaFormulario(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head>
          <meta charset="UTF-8" />
          <title>Formulário</title>
      </head>
      <body>
          <form action="/pedido" method="get">
              <label for="nome">Nome</label>
              <input type="text" name="nome" id="nome">
              
              <label for="produto">Produto</label>
              <input type="text" name="produto" id="produto">
              
              <label for="qtd">Quantidade</label>
              <input type="number" name="qtd" id="qtd">
              
              <button type="submit">Enviar</button>
          </form>
      </body>
    </html>
  `);
}

// Rota: /pedido
function paginaPedido(req, res) {
  // A lógica de parseamento é a mesma do arquivo anterior
  const fullUrl = new url.URL(req.url, `http://${hostname}:${porta}`);
  let parametros = fullUrl.searchParams;

  let nome = parametros.get('nome');
  let produto = parametros.get('produto');
  let qtd = parametros.get('qtd');

  if (!nome) {
    nome = "[Nome não fornecido]";
  }

  let qtdNumerica = parseInt(qtd);

  // A resposta de sucesso ou erro
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  
  if (isNaN(qtdNumerica) || qtdNumerica < 0) {
    res.end(`${nome}, você informou uma quantidade de produtos incorreta, favor fazer a requisição novamente.`);
  } else {
    res.end(`${nome}, o seu pedido para ${qtd} item(ns) do produto '${produto}' será processado.`);
  }
}
