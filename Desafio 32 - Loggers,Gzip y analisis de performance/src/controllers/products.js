const Product = require('../models/Product')
const logger = require('../log/index')

const getAllProducts = async (req, res) => {

  const { orderBy, search } = req.query;
  try {
    const products = await Product.getAll(orderBy, search);
    res.send(products);
   
   }
  catch (e) {
    logger.error(e)
  res.status(500).send({error: e.message})}

}

const getProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    const product = await Product.getById(id);
    res.send(product)
  } catch (e) {
    logger.error(e)
    res.status(404).send({ error: 'Product not found' })}
}

const saveProduct = async(req, res)=> {

  const { body } = req;
  try {
    const product = await Product.create(body);
    res.status(201).send(product)
  } catch (e) {
    logger.error(e)
  res.status(500).send({error: e.message})}
}


const updateProductById = async (req, res) => {
  const { id } = req.params; 
  const { body } = req;
  try {
   await Product.update(id, body);
  res.sendStatus(201);
  } catch (e) {
    logger.error(e)
  res.status(404).send({error: 'Product not found'})}
  
}

const deleteProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    await Product.deleteById(id);
    res.sendStatus(202);

  } 
  catch (e) {
    logger.error(e)
  res.status(404).send({error:'Product not found'})}
}


module.exports = {getAllProducts,getProductById,saveProduct,updateProductById,deleteProductById}