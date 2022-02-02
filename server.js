const express = require("express");
const app = express();
const nuevoProducto = require("./index")

app.get("/productos", async (req, res) => {
  const data = await nuevoProducto.getAll();
  res.send(JSON.stringify(data));
});

app.get("/productoRandom", async (req, res) => {
  const data = await nuevoProducto.getAll();
  const random = Math.floor(Math.random() * (data.length));
    res.send(JSON.stringify(data[random]));
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on('Error', (err) => console.log(err));