const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const { engine } = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const productsRouter = require("./routes/products");
const Product = require("./models/Product");
const product = new Product();

app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "index",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //req.body
app.use(cookieParser());

app.use("/static", express.static(path.join(__dirname, "public"))); //ruta absoluta

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/form.html")));

app.get("/productos",async (req, res) => {
  const products = await product.getAll()
  res.render("main", { products })
});


app.use("/productos", productsRouter);

const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

server.on("Error", (err) => console.log(err));
