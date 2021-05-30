const mongoose = require('mongoose');
const Joi = require('joi');

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

const joiSchema = Joi.object({
  nome: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  preco: Joi.number()
    .required(),
  descricao: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  imagem: Joi.string(),
  permiteAlteracao: Joi.boolean(),
})

produtoSchema.methods.validar = function (item) {
  const { error } = joiSchema.validate(item)

  return error
}

module.exports = mongoose.model('Produto', produtoSchema);