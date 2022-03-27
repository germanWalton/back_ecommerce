const productMongo = require('../models/ProductMongo')
const productFirebase = require('../models/ProductFirebase')


const getAllProducts = async (req, res) => {

  const { orderBy, search } = req.query;
  try {
    const productsMong = await productMongo.getAll(orderBy, search);
    // const productsFire = await productFirebase.getAll()
     // Probar comentando un metodo y descomentando el otro 
    res.send(productsMong);
   
   }
  catch (e) {
    console.log(e)
  res.status(500).send({error: e.message})}

}

const getProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    const productMong = await productMongo.getById(id);
    // const productFire = await productFirebase.getById(id)
   // Probar comentando un metodo y descomentando el otro 
    res.send(productMong)
  } catch (e) {
    console.log(e)
    res.status(404).send({ error: 'Product not found' })}
}

const saveProduct = async(req, res)=> {

  const { body } = req;
  try {
    const productMong = await productMongo.create(body);
    // const productFire = await productFirebase.create(body)
     // Probar comentando un metodo y descomentando el otro 
    res.status(201).send(productMong)
  } catch (e) {
    console.log(e)
  res.status(500).send({error: e.message})}
}


const updateProductById = async (req, res) => {
  const { id } = req.params; 
  const { body } = req;
  try {
   await productMongo.update(id, body);
  //  await productFirebase.update(id, body);
 // Probar comentando un metodo y descomentando el otro 
  res.sendStatus(201);
  } catch (e) {
    console.log(e)
  res.status(404).send({error: 'Product not found'})}
  
}

const deleteProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    await productMongo.deleteById(id);
   //  await productFirebase.deleteById(id);
  // Probar comentando un metodo y descomentando el otro 
    res.sendStatus(202);

  } 
  catch (e) {
    console.log(e)
  res.status(404).send({error:'Product not found'})}
}


module.exports = {getAllProducts,getProductById,saveProduct,updateProductById,deleteProductById}