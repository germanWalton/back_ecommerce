const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT || 8080;

const productsRouter = require('./routes/products');
app.use(express.json()); //req.body
app.use(express.urlencoded({extended:true})) //req.body
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public'))) //ruta absoluta
app.use('/docs',express.static(path.join(__dirname,'docs'))) //ruta absoluta



app.use('/api/productos',productsRouter)


const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("Error", (err) => console.log(err));
