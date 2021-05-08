const mongoose = require('mongoose');

var produtoSubSchema = new mongoose.Schema(
  {
    idProduto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto", // Schema
    },
    quantidade: {
      type: Number,
      default: 1,
    },
    comentario: String,
  },
  { _id: false }
);


var pedidoSchema = new mongoose.Schema({
  data: {
    type: Date,
    default: Date.now,
  },
  nomeUsuario: {
    type: String,
    required: true,
    index: true,
  },
  lista: [produtoSubSchema],
});

module.exports = mongoose.model('Pedido', pedidoSchema);