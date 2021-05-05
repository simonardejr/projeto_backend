const express = require("express");
const mongoose = require("mongoose");

const produtoRoutes = require("./api/routes/produtos");
const pedidoRoutes = require("./api/routes/pedidos");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (error) => {
  if (error) {
    console.log('Falha ao conectar MongoDB')
  } else {
    console.log('Sucesso conectar MongoDB')
  }
})

app.use("/", (req, res, next) => {
  res.setHeader("headerExemploMiddleware", "IESB");
  next();
});

app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);

app.use((req, res, next) => {
  const err = new Error("URL Inexistente")
  err.status = 404
  next(err)
  // res.send({ mensagem: "URL Inexistente" })
})

app.use((err, req, res, next) => {
  res.status(err.status)
  res.send({ mensagem: err.message })
})

app.listen(port, () => console.log(`App iniciou na porta ${port}!`));
