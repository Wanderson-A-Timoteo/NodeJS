const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js'); // Importa a nossa conexão configurada

class Nota extends Model { } // Cria a classe herdando de 'Model'

Nota.init(
  // Definição das Colunas (Atributos)
  {
    // O ID agora é gerenciado pelo banco (Auto Increment)
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    titulo: { 
        type: DataTypes.STRING, 
        unique: true, // Não permite títulos repetidos
        allowNull: false 
    },
    texto: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    importancia: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    lida: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }
  },
  // Configurações do Modelo
  { 
    sequelize, // A instância da conexão
    freezeTableName: true, // Força o nome da tabela a ser 'Nota' (sem pluralizar automáticamente como professor disse)
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em',
  }
);

// Cria a tabela no banco se não existir
sequelize.sync({ alter: true }).then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
});

module.exports = Nota;
