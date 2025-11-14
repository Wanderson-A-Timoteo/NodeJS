const http = require('node:http');
const url = require('node:url'); // Importa o módulo URL

const hostname = '127.0.0.1';
const porta = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  // --- INÍCIO DA CORREÇÃO ---
  // A forma robusta de tratar a URL é construindo um objeto URL completo.
  // Precisamos de uma "base" (http://127.0.0.1:3000) para que ele saiba 
  // interpretar o req.url (que é só o caminho, ex: /?nome=...)
  const fullUrl = new url.URL(req.url, `http://${hostname}:${porta}`);
  
  // Agora pegamos os searchParams (parâmetros de busca) de forma segura
  let parametros = fullUrl.searchParams;
  // --- FIM DA CORREÇÃO ---

  // Agora podemos pegar os parâmetros pelo nome da chave, sem prefixos
  let nome = parametros.get('nome');
  let produto = parametros.get('produto');
  let qtd = parametros.get('qtd');

  // Adicionando uma verificação para o caso de 'nome' não ser enviado
  if (!nome) {
    nome = "[Nome não fornecido]";
  }

  // Converte a quantidade para número para poder comparar
  let qtdNumerica = parseInt(qtd);

  // Adicionamos isNaN para o caso de 'qtd' não ser um número
  if (isNaN(qtdNumerica) || qtdNumerica < 0) {
    res.end(`${nome}, você informou uma quantidade de produtos incorreta, favor fazer a requisição novamente.`);
  } else {
    // Usando aspas simples no 'produto' para ficar igual ao slide
    res.end(`${nome}, o seu pedido para ${qtd} item(ns) do produto '${produto}' será processado.`);
  }
});

server.listen(porta, hostname, () => {
  console.log(`Servidor rodando no endereço http://${hostname}:${porta}/`);
});
