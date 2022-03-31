// (async () => {

  const express = require("express");
  const path = require("path");
  const http = require("http");
  const app = express();
  const PORT = process.env.PORT || 8080;
  const moment = require("moment");
  const mongoose = require('mongoose');
  const { SCHEMA, HOSTNAME, DATABASE, USER, PASSWORD, OPTIONS } = require('./config');
  const Product = require("./models/product");
  const Chat = require("./models/chat");
  const Message = require("./models/Message")

mongoose.connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`).then(() => {
  console.log('connected to mongo')


  const { Server } = require("socket.io");
  const server = http.createServer(app);
  const io = new Server(server);

  // try {
  //  await Chat.loadData();
  // } catch (e) {
  //   console.log(e);
  // }

  app.use("/static", express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html"))
  );



  // socket

  io.on("connection", async (socket) => {
    // cuando una nueva conexión llega al server
    console.log(`an user connected ${socket.id}`);

    // envío de productos
    socket.emit("Products", await Product.getFaker());

    socket.on("save", async (product) => {
      // guardo el producto
      await Product.create(product);
      // renderizo los productos
      io.sockets.emit("Products", await Product.getFaker());
    });

    // envío de mensajes
    socket.emit("Messages", await Message.readMessages());

    socket.on("Msg", async (message) => {
       // guardo el mensaje
      await Message.saveMessage(message);
      // renderizo los mensajes
      io.sockets.emit("Messages", await Message.readMessages());
    });
  });

  server.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
  });

  server.on("Error", (err) => console.log(err));
// })();

}).catch((e)=>console.log(e))