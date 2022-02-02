const fs = require("fs").promises;
const Contenedor = require("./class");

const nuevoProducto = new Contenedor("./productos.txt");


module.exports = nuevoProducto;