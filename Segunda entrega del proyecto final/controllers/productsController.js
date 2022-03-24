const productModel = require('../models/ProductMongo')


const getAllProducts = async (req, res) => {

  const { orderBy, search } = req.query;
  try {
    const products = await productModel.getAll(orderBy, search);
    res.send(products);
   }
  catch (e) {
    console.log(e)
  res.status(500).send({error: e.message})}

}

const getProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    const product = await productModel.getById(id);
    res.send(product)
  } catch (e) {
    console.log(e)
    res.status(404).send({ error: 'Product not found' })}
}

const saveProduct = async(req, res)=> {

  const { body } = req;
  try {
   const product = await productModel.create(body);
    res.status(201).send(product)
  } catch (e) {
    console.log(e)
  res.status(500).send({error: e.message})}
}


const updateProductById = async (req, res) => {
  const { id } = req.params; 
  const { body } = req;
  try {
    await productModel.update(id,body);
    res.sendStatus(201);
  } catch (e) {
    console.log(e)
  res.status(404).send({error: 'Product not found'})}
  
}

const deleteProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    await productModel.deleteById(id);
    res.sendStatus(202);

  } 
  catch (e) {
    console.log(e)
  res.status(404).send({error:'Product not found'})}
}


module.exports = {getAllProducts,getProductById,saveProduct,updateProductById,deleteProductById}