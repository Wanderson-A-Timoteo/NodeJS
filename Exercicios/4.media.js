const http = require('node:http');
const url = require('node:url');

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  // Roteador
  if (req.url.startsWith('/media')) { // Rota que calcula a média
    paginaMedia(req, res);
  } else { // Rota padrão (/) exibe o formulário
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
    <head>
        <meta charset="UTF-8" />
        <title>Calculadora de Média</title>
    </head>
    <body>
        <h1>Calculadora de Média</h1>
        <p>Informe os números abaixo para o aplicativo poder calcular a média:</p>
        
        <form action="/media" method="get">
            <label for="n1">Número 1:</label>
            <input type="number" name="n1" id="n1" value="10"><br><br>
            
            <label for="n2">Número 2:</label>
            <input type="number" name="n2" id="n2" value="20"><br><br>
            
            <label for="n3">Número 3:</label>
            <input type="number" name="n3" id="n3" value="30"><br><br>
            
            <button type="submit">Calcular</button>
        </form>
    </body>
    </html>
  `);
}

// Rota: /media - Processa os dados e exibe o resultado
function paginaMedia(req, res) {
  // Parseia os parâmetros da URL
  const fullUrl = new url.URL(req.url, `http://${hostname}:${porta}`);
  let parametros = fullUrl.searchParams;

  // Usa parseFloat para converter de texto para número (com casas decimais)
  let n1 = parseFloat(parametros.get('n1'));
  let n2 = parseFloat(parametros.get('n2'));
  let n3 = parseFloat(parametros.get('n3'));

  // Verifica se os números são válidos
  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erro: Todos os campos devem ser números válidos.');
  } else {
    // Calcula a média
    let media = (n1 + n2 + n3) / 3;

    // Exibe o resultado
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Resultado da Operação</title>
        </head>
        <body>
            <h1>Resultado da Operação</h1>
            <p>Os números informados foram: ${n1}, ${n2} e ${n3}.</p>
            <p>Média dos 3 números: ${media.toFixed(2)}</p>
            <p><a href="/">Calcular Novamente</a></p>
        </body>
        </html>
    `);
  }
}
