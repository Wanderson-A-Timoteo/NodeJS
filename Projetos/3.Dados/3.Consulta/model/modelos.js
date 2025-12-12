const mongoose = require('./server.js');

// Definição do Schema (Estrutura dos dados)
const NotaSchema = new mongoose.Schema({
    titulo: { 
        type: String, 
        required: true, 
        maxLength: 128 
    },
    texto: { 
        type: String, 
        required: true 
    },
    importancia: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    lida: { 
        type: Boolean, 
        default: false 
    }
}, {
    collection: 'nota', // Nome da coleção no MongoDB
    timestamps: {
        createdAt: 'criada_em', // Mapeia o padrão createdAt para 'criada_em'
        updatedAt: 'atualizada_em' // Mapeia o padrão updatedAt para 'atualizada_em'
    }
});

// Cria um índice do tipo 'text' no campo 'titulo' para permitir buscas
NotaSchema.index({ titulo: 'text' });

// Cria o modelo 'Nota' com base no Schema
const Nota = mongoose.model('Nota', NotaSchema);

module.exports = Nota;
