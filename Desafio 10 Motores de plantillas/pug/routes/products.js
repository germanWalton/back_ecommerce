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

router.post('/', async (req, res) => {
  await productModel.save(req.body)
  res.redirect(`/productos/result?product=${req.body.title}`)
})

router.get('/result', (req,res)=> res.render('result', {product:req.query.product}))


module.exports = router;
