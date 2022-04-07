(async () => {
  const express = require("express");
  const path = require("path");
  const app = express();

  const http = require("http");
  const mongoose = require("mongoose");

  //socket io
  const { Server } = require("socket.io");
  const server = http.createServer(app);
  const io = new Server(server);


  const { engine } = require("express-handlebars");

  //middlewares
  const cookieParser = require('cookie-parser');
  const session = require('express-session');

  //session store 
  const MongoStore = require('connect-mongo');
  const mongoConfig = require('./config');



  //routers
  const homeRouter = require("./routes/home");

  const PORT = process.env.PORT || 8080;

  const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } = mongoConfig;

  app.set("view engine", "hbs");
  app.engine(
    "hbs",
    engine({
      layoutsDir: path.join(__dirname, "../views/layouts"),
      extname: "hbs",
      defaultLayout: "index",
    })
  );

  mongoose.connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`).then(() => {
    console.log('Connected to mongo')
  })
  

  //json middlewares -> req.body {}
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser("Esto es un secreto")); //req.cookies = {}
  app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    
    store: new MongoStore({
      mongoUrl: `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`,
      ttl: 1 * 60,
      expires: 1000 * 1 * 60,
      autoRemove: "native"
    })
  }))

  app.use("/static/", express.static(path.join(__dirname, "../public")));

  app.use("/", homeRouter);





//socket
  
  const Product = require("./models/Product");
  const Message = require("./models/Message");


  io.on("connection",async (socket) => {
    // cuando una nueva conexión llega al server
    console.log(`an user connected ${socket.id}`);

    // envío de productos
    socket.emit("Products", await Product.getAll());

    socket.on("save",async (product) => {
      // guardo el producto
      await Product.create(product);
      // renderizo los productos
      io.sockets.emit("Products", await Product.getAll());
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









  server.listen(
    PORT,
    () => console.log(`listening on https://localhost:${PORT}`)
  )
})();
