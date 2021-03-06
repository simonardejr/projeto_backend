const express = require("express");
const router = express.Router();

const Produto = require("../models/produto");

const qtElementosNaPagina = 2;

/**
 * GET /produtos
 * Lista de produtos
 */
router.get("/", async function (req, res) {
  const { pagina } = req.query;
  const elementosPulados = (pagina - 1) * qtElementosNaPagina;

  try {

    const doc = await Produto.find({
      // nome: /Yakissoba.*/,
      // nome: { $in: [/Yakissoba.*/, /Frango.*/] }
      // preco: { $gte: 30.9 }
    })
      .sort({
        nome: 1, // menor para o maior / -1, // maior para o menor
      })
      .skip(elementosPulados)
      .limit(qtElementosNaPagina)
      .select("-permiteAlteracao -__v")
    res.send(doc)

  } catch (err) {
    console.log(`Erro GET produtos! ${err}`)
    res.status(500).send({ mensagem: err.message, erro: err });
  }

});


/**
 * POST /produtos
 * Inserção de produtos
 */
router.post("/", (req, res, next) => {
  const { nome, preco, descricao, imagem, permiteAlteracao } = req.body;

  const infoProduto = {
    nome: nome,
    descricao: descricao,
    preco: preco
  }

  if (imagem) {
    infoProduto.imagem = imagem
  }

  if (permiteAlteracao) {
    infoProduto.permiteAlteracao = permiteAlteracao
  }

  const produto = new Produto(infoProduto)

  try {
    validacao = produto.validar(req.body)
    if (validacao != null) {
      throw new Error('Parando... ' + validacao)
    }

    produto
      .save()
      .then((doc) => {
        console.log(`POST produtos sucesso! ${doc}`);
        res.status(204).send({ mensagem: "Objeto criado", doc: doc });
      })
      .catch((err) => {
        console.log(`Erro POST produtos! ${err}`);
        if (err.code == 11000) {
          res.status(500).send({ mensagem: "Esse produto já foi cadastrado." });
          return;
        }
        res.status(500).send({ mensagem: err.message, erro: err });
      });
  }
  catch (err) {
    next(err)
  }

});


/**
 * GET /produtos/id
 * Informações do produto informado
 */
router.get("/:idProduto", async (req, res) => {
  const { idProduto } = req.params;

  try {

    const doc = await Produto.find({
      _id: idProduto,
    }).select("_id nome");

    res.send(doc)

  } catch (err) {
    console.log({ mensagem: err.message })
    next(err);
  }

});


/**
 * PATCH /produtos/id
 * Atualiza o produto informado
 */
router.patch("/:idProduto", async (req, res) => {
  const { idProduto } = req.params;
  const updateParams = {};
  for (const param of Object.keys(req.body)) {
    updateParams[param] = req.body[param];
  }
  try {
    const doc = await Produto.updateOne(
      {
        _id: idProduto,
      },
      updateParams
    );
    res.status(204).send({});
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensagem: err.message });
  }
});


/**
 * DELETE /produtos/id
 * Deleta o produto informado
 */
router.delete("/:idProduto", async function (req, res) {
  const { idProduto } = req.params;
  try {
    const doc = await Produto.deleteOne({
      _id: idProduto,
    });
    res.status(204).send({});
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensagem: err.message });
  }
});


// produtos/exemplo
/*
router.post("/exemplo", function (req, res) {
  const { chave, numero, preco } = req.headers;
  console.log(`Parametros headers: ${chave} ${numero} ${preco}`);

  const { ordenacao, pagina } = req.query;
  console.log(`Parametros url: ${ordenacao} ${pagina}`);

  const { nome, descricao } = req.body;
  console.log(`Body: ${nome} ${descricao}`);

  res.status(201).send(`POST produtos`);
});
*/

module.exports = router;