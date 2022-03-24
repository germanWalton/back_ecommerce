const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { SCHEMA, HOSTNAME, DATABASE, USER, PASSWORD, OPTIONS } = require('./config');
const cartRouter = require('./routers/cart');
const productsRouter = require('./routers/products');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`).then(() => {
  console.log('connected to mongo')

  app.use(express.json()); //req.body
  app.use(express.urlencoded({extended:true})) //req.body
 
  app.use('/static', express.static(path.join(__dirname, 'public')));
 
 
  app.use('/api/productos', productsRouter);
  app.use('/api/carrito', cartRouter);
 
 
  const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
  });
 
  server.on("Error", (err) => console.log(err));



}).catch((e)=>console.log(e))


