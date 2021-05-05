const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  const { name, description } = req.body;
  res.send(`GET pedidos`);
});

router.post("/", function (req, res) {
  const { name, description } = req.body;
  res.send(`POST pedidos`);
});

router.get("/:idPedido", (req, res) => {
  const { idPedido } = req.params;
  res.send({
    mensagem: idPedido,
  });
});

router.delete("/:idPedido", (req, res) => {
  const { idPedido } = req.params;
  res.send({
    mensagem: idPedido,
  });
});

module.exports = router;
