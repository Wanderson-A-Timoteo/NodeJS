// model/server.js
const mongoose = require('mongoose');

// IP do Windows que você acabou de descobrir
const windowsIP = '172.27.48.1';

// String de conexão
const dbURI = `mongodb://${windowsIP}:27017/notas_nosql`;

mongoose.connect(dbURI)
    .then(() => {
        console.log('Conexão com banco de dados MongoDB estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao se conectar ao banco de dados:', error);
        console.error('Dica: Verifique se o arquivo mongod.cfg no Windows está com bindIp: 0.0.0.0 e se o serviço foi reiniciado.');
    });

module.exports = mongoose;
