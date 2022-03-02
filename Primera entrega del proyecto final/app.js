const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

const cartRouter = require('./routers/cart');
const productsRouter = require('./routers/products');

app.use(express.json()); //req.body
app.use(express.urlencoded({extended:true})) //req.body

app.use('/static', express.static(path.join(__dirname, 'public')));


app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);


const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("Error", (err) => console.log(err));
