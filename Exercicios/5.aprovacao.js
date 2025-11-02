const http = require('node:http');
const url = require('node:url');
// Não precisamos mais do 'fs'

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  // Roteador
  if (req.url.startsWith('/verificar')) {
    paginaVerificar(req, res);
  } else {
    // Não precisamos mais das rotas de imagem
    paginaFormulario(req, res);
  }
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});

// --- Funções de cada página ---

// Rota: / (Padrão) - Exibe o formulário
function paginaFormulario(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
    <head><meta charset="UTF-8" /><title>Verificar Aprovação</title></head>
    <body>
        <h1>Informe as notas para verificação se você foi aprovado ou reprovado:</h1>
        <form action="/verificar" method="get">
            <label for="n1">Nota 1:</label>
            <input type="number" step="0.1" name="n1" id="n1" required><br><br>
            <label for="n2">Nota 2:</label>
            <input type="number" step="0.1" name="n2" id="n2" required><br><br>
            <label for="n3">Nota 3:</label>
            <input type="number" step="0.1" name="n3" id="n3" required><br><br>
            <label for="n4">Nota 4:</label>
            <input type="number" step="0.1" name="n4" id="n4" required><br><br>
            <button type="submit">Enviar</button>
        </form>
    </body>
    </html>
  `);
}

// Rota: /verificar - Processa os dados e exibe o resultado
function paginaVerificar(req, res) {
  const fullUrl = new url.URL(req.url, `http://${hostname}:${porta}`);
  let parametros = fullUrl.searchParams;

  let n1 = parseFloat(parametros.get('n1'));
  let n2 = parseFloat(parametros.get('n2'));
  let n3 = parseFloat(parametros.get('n3'));
  let n4 = parseFloat(parametros.get('n4'));

  if (isNaN(n1) || isNaN(n2) || isNaN(n3) || isNaN(n4)) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erro: Todos os campos devem ser números válidos.');
  } else {
    let media = (n1 + n2 + n3 + n4) / 4;
    let status = '';
    let mensagem = '';
    let imagemUrl = ''; // URLs do placehold.co

    if (media >= 6.0) {
      mensagem = "Parabéns, você foi aprovado!!!";
      status = "APROVADO";
      // ATUALIZADO: URL verde com texto "APROVADO"
      imagemUrl = "https://placehold.co/300x100/4CAF50/FFFFFF?text=APROVADO";
    } else {
      mensagem = "Infelizmente não foi desta vez :(";
      status = "REPROVADO";
      // ATUALIZADO: URL vermelha com texto "REPROVADO"
      imagemUrl = "https://placehold.co/300x100/F44336/FFFFFF?text=REPROVADO";
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <html>
        <head><meta charset="UTF-8" /><title>Resultado da Verificação</title></head>
        <body>
            <h1>Resultado da Verificação</h1>
            <p>Sua média foi: ${media.toFixed(2)}</p>
            <h2>${mensagem}</h2>
            <img src="${imagemUrl}" alt="${status}">
            <br><br>
            <a href="/">Calcular Novamente</a>
        </body>
        </html>
    `);
  }
}
