const mongoose = require('mongoose');

var produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  preco: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  permiteAlteracao: {
    type: Boolean,
    default: true,
  },
  imagem: String
});

module.exports = mongoose.model('Produto', produtoSchema);