const express = require("express");
const path = require("path");
const app = express();
const pugEngine = require('./engines/pug')

const PORT = process.env.PORT || 8080;
const pugRouter = require("./routes/products");


pugEngine(app)

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //req.body

app.use("/static", express.static(path.join(__dirname, "public"))); //ruta absoluta

app.use("/productos", pugRouter);

const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("Error", (err) => console.log(err));
