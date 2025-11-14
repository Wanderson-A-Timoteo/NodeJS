import express from 'express'; // Sintaxe moderna

const app = express(); // Note que não usamos 'new' 
const porta = 3000;

// Rota para '/'
const ola_mundo = function(req, res) {
  res.send('Olá Mundo!'); // Muito mais simples!
}

app.get('/', ola_mundo); // Roteamento limpo

// Inicia o servidor
app.listen(porta, '0.0.0.0', () => {
  console.log(`Servidor rodando no endereço http://localhost:${porta}\n`);
});
