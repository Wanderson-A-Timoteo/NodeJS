const http = require('node:http');
const fs = require('node:fs'); // Importa o Módulo File System

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  // Roteador
  if (req.url === "/") { //requisição página principal
    paginaPrincipal(req, res);
  } else if (req.url === "/sobre") { //requisição página "Sobre"
    paginaSobre(req, res);
  } else {
    // Rota 404
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Não foi possível acessar o caminho: " + req.url);
  }
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});

// --- Funções que servem os arquivos ---

function paginaPrincipal(req, res) {
  // Define o cabeçalho como HTML
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  try {
    // Lê o arquivo HTML da página principal de forma síncrona
    // O './' se refere ao diretório onde o script node está rodando
    const html = fs.readFileSync('./html/index.html');
    res.write(html); // Envia o conteúdo do arquivo
    res.end();
  } catch (erro) {
    // Se der erro ao ler o arquivo
    console.error("Houve o seguinte erro ao tentar acessar o arquivo: " + erro);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Erro interno do servidor. Não foi possível carregar a página.");
  }
}

function paginaSobre(req, res) {
  // Define o cabeçalho como HTML
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  try {
    // Lê o arquivo HTML da página sobre
    const html = fs.readFileSync('./html/sobre.html');
    res.write(html); // Envia o conteúdo do arquivo
    res.end();
  } catch (erro) {
    // Se der erro ao ler o arquivo
    console.error("Houve o seguinte erro ao tentar acessar o arquivo: " + erro);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Erro interno do servidor. Não foi possível carregar a página.");
  }
}
