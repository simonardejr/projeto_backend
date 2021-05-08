const express = require("express");
const routes = express.Router();

const Pedido = require("../models/pedido");

const qtElementosNaPagina = 2;


/**
 * GET /pedidos
 * Lista de pedidos
 */
routes.get("/", async (req, res) => {
  const { pagina } = req.query;
  const elementosPulados = (pagina - 1) * qtElementosNaPagina;

  try {

    const doc = await Pedido.find()
      .populate("lista.idProduto")
      .sort({
        data: -1, // menor para o maior / -1, // maior para o menor
      })
      .skip(elementosPulados)
      .limit(qtElementosNaPagina)
      .select("-permiteAlteracao -__v")

    res.send(doc);

  } catch (err) {
    res.status(500).send({ mensagem: err.message, erro: err });
  }

});


/**
 * POST /pedidos
 * Inserção de pedidos
 */
routes.post("/", async (req, res) => {
  const { nomeUsuario, lista } = req.body;

  try {

    const pedido = new Pedido({
      nomeUsuario: nomeUsuario,
      lista: lista,
    });

    const doc = await pedido.save();

    res.status(204).send({});
  } catch (err) {
    res.status(500).send({ mensagem: err.message, erro: err });
  }

});


/**
 * GET /pedidos/id
 * Informações do pedido informado
 */
routes.get("/:idPedido", async function (req, res) {
  const { idPedido } = req.params;

  try {

    const doc = await Pedido.find({
      _id: idPedido,
    }).populate("lista.idProduto");

    res.send(doc);

  } catch (err) {
    res.status(500).send({ mensagem: err.message, erro: err });
  }

});


/**
 * DELETE /pedidos/id
 * Deleta o pedido informado
 */
routes.delete("/:idPedido", async function (req, res) {
  const { idPedido } = req.params;

  try {

    const doc = await Pedido.deleteOne({
      _id: idPedido,
    });

    res.status(204).send({});

  } catch (err) {
    console.log(err);
    res.status(500).send({ mensagem: err.message });
  }

});

module.exports = routes;
