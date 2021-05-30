const mongoose = require('mongoose');
const Joi = require('joi');

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

const produtoSubSchemaJoi = Joi.object({
  idProduto: Joi.string().required(),
  quantidade: Joi.number().required(),
  comentario: Joi.string().min(3).max(30).trim()
});

const pedidoSchemaJoi = Joi.object({
  data: Joi.date(),
  nomeUsuario: Joi.string().trim().required(),
  lista: Joi.array().items(produtoSubSchemaJoi).required()
});

pedidoSchema.methods.validar = function (item) {
  const { error } = pedidoSchemaJoi.validate(item)

  return error
}

module.exports = mongoose.model('Pedido', pedidoSchema);