const express = require("express");
const { Router } = express;
const router = Router();
const Product = require("../models/Product");
const productModel = new Product();




router.get('/', async (req, res) => {
  const products = await productModel.getAll()
  res.render('index', { products })
})

router.get('/add', async (req, res) => res.render('form'))

router.post('/add', async (req, res) => {
  await productModel.save(req.body)
  res.redirect(`/pug/result?product=${req.body.title}`)
})

router.get('/result', (req,res)=> res.render('result', {product:req.query.product}))

/*
//GET /productos

router.get("/", async (req, res) => {
  // req.query parametros de busqueda o querystring
  const data = await nuevoProducto.getAll();
  res.send(JSON.stringify(data));
});

//GET /productos/id

router.get("/:id", async (req, res) => {
  const { id } = req.params; //parametros de URL
  const product = await nuevoProducto.getById(id);
  if (!product) {
    res.status(404).send({
      error: "product not found",
    });
    return;
  }
  res.send(JSON.stringify(product));
});

router.get("/productoRandom", async (req, res) => {
  const data = await nuevoProducto.getAll();
  const random = Math.floor(Math.random() * data.length);
  res.send(JSON.stringify(data[random]));
});

//POST /productos

router.post("/", async (req, res) => {
  const { title, price, thumbnail } = await req.body;
  nuevoProducto.save({ title, price, thumbnail });
  // res.sendStatus(201);
  res.redirect("/");
  
});

//PUT /productos/id

router.put("/:id", async (req, res) => {
  const { id } = req.params; //parametros de URL
  const product = await nuevoProducto.getById(id);
  if (!product) {
    res.status(404).send({
      error: "product not found",
    });
    return;
  }
  const obj = req.body;
  nuevoProducto.updateById(id, obj);
  res.sendStatus(200);
});

//DELETE /productos/id

router.delete("/:id", async (req, res) => {
  const { id } = req.params; //parametros de URL
  const product = await nuevoProducto.getById(id);
  if (!product) {
    res.status(404).send({
      error: "product not found",
    });
    return;
  }

  nuevoProducto.deleteById(id);
  res.sendStatus(200);
});
*/
module.exports = router;
