const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 8080;
const Container = require("./models/Container");
const moment = require("moment");

const products = new Container("./database/productos.json");
const chats = new Container("./database/chats.json");

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);



app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// socket

io.on('connection', async (socket) => {
  // cuando una nueva conexión llega al server
  console.log(`an user connected ${socket.id}`);

  // envío de productos
  socket.emit("Products", await products.getAll());

  socket.on("save", async (product) => {
    // guardo el producto
    await products.save(product);
    // renderizo los productos
    io.sockets.emit("Products", await products.getAll());
  });

  // envío de mensajes
  socket.emit("Messages", await chats.getAll());

  socket.on("Msg", async (message) => {
    const date = moment().format("DD/MM/YYYY HH:mm:ss");
    console.log(date);
    message.date = date;
    // guardo el mensaje
    await chats.save(message);
    // renderizo los mensajes
    io.sockets.emit("Messages", await chats.getAll());
  });
});

server.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("Error", (err) => console.log(err));
