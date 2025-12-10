const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

// --- MODELO USUARIO ---
class Usuario extends Model { }
Usuario.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nome: { type: DataTypes.STRING, allowNull: false },
    sobrenome: { type: DataTypes.STRING, allowNull: true }, // Opcional
    email: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
});

// --- MODELO NOTA ---
class Nota extends Model { }
Nota.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    titulo: { type: DataTypes.STRING, unique: true, allowNull: false },
    texto: { type: DataTypes.TEXT, allowNull: false },
    importancia: { type: DataTypes.INTEGER, allowNull: false },
    lida: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
});

// --- MODELO TAG ---
class Tag extends Model { }
Tag.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    tag: { type: DataTypes.STRING(32), allowNull: false, unique: true },
    cor: { type: DataTypes.STRING(16), allowNull: true }
}, {
    sequelize,
    freezeTableName: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
});

// --- RELACIONAMENTOS ---

// 1 Usuario tem N Notas (1:N)
Usuario.hasMany(Nota, {
    foreignKey: { name: 'usuario_id', allowNull: false }, // Obrigatório
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
});
Nota.belongsTo(Usuario, {
    foreignKey: { name: 'usuario_id', allowNull: false }
});

// 1 Nota tem N Tags (N:N)
Nota.belongsToMany(Tag, {
    through: 'Nota_Tag', // Tabela intermediária
    foreignKey: 'nota_id',
    otherKey: 'tag_id',
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
});
Tag.belongsToMany(Nota, {
    through: 'Nota_Tag',
    foreignKey: 'tag_id',
    otherKey: 'nota_id'
});

// Sincronização
// force: true -> Apaga as tabelas antigas e cria novas
// Usamos isso agora para garantir que a estrutura nova seja criada limpa.
sequelize.sync({ force: true }).then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
}).catch((error) => {
    console.error('Erro ao sincronizar:', error);
});

// Exporta todos os modelos
module.exports = { Usuario, Nota, Tag };
