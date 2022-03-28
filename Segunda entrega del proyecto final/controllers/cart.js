const CartMongo = require('../models/CartMongo');
const CartFirestore = require('../models/CartFirebase')

//probar los metodos de a uno, o carrito de Mongo o de Firebase

const createCart = async (req, res) => {
  const { product } = req.body
  try {
    const cartMong = await CartMongo.create(product);
    // const cartFire = await CartFirestore.create(product)
    res.send(cartMong)
  } catch (e) {
    console.log(e);
    res.status(500).send({error: e.message})}
}

const addToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
     await CartMongo.addToCart(id, productId);
    //  await CartFirestore.addToCart(id,productId)
  res.sendStatus(201)
  }
  catch(e) {
    console.log(e);
    res.status(500).send({error:'Cart or product not found'})}
  }
   


const getCartProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const cartMong = await CartMongo.getCartProductsById(id);
    // const cartFire = await CartFirestore.getCartProductsById(id)
    res.status(200).send(cartMong);
  } catch (e) {
    console.log(e);
  res.status(404).send({error:e.message})}
}

const deleteCartById = async (req, res) => {
  const { id } = req.params; 
  try {
     await CartMongo.deleteById(id);
    // await CartFirestore.deleteById(id)
    res.sendStatus(202)
  }
  catch (e) {
    console.log(e)
    res.status(404).send({
      error: "cart not found",
    })
  }
   } 
    


const deleteCartProductById = async (req, res) => {
  const {id,cod_prod} = req.params; 

  try {
    await CartMongo.deleteCartProductById(id, cod_prod);
    // await CartFirestore.deleteCartProductById(id, cod_prod)
    res.sendStatus(202)
  }
  catch(e) {
    console.log(e)
    res.status(404).send({
      error: "Element not found",
    })
  }

}

module.exports = {createCart,addToCart,getCartProducts,deleteCartById,deleteCartProductById};