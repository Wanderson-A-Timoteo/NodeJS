// model/server.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'notas',       // Nome do banco
    'fullstack',   // Usuário criado para acesso externo
    '12345678',    // Senha
    {
        host: '172.27.48.1', // Endereço IP do host do banco de dados MySQL no Windows 11 PRO com WSL2
        port: 3307,          // Sua porta do MySQL
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso.');
}).catch((error) => {
    console.error('Erro ao se conectar ao banco de dados:', error);
});

module.exports = sequelize;
