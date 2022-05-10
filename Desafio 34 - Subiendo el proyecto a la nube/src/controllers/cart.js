const Cart = require('../models/Cart');


const createCart = async (req, res) => {
  const { product } = req.body
  try {
    const cart = await Cart.create(product);
    res.send(cart)
  } catch (e) {
    console.log(e);
    res.status(500).send({error: e.message})}
}

const addToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
     await Cart.addToCart(id, productId);
  res.sendStatus(201)
  }
  catch(e) {
    console.log(e);
    res.status(500).send({error:'Cart or product not found'})}
  }
   


const getCartProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.getCartProductsById(id);
    res.status(200).send(cart);
  } catch (e) {
    console.log(e);
  res.status(404).send({error:e.message})}
}

const deleteCartById = async (req, res) => {
  const { id } = req.params; 
  try {
    await Cart.deleteById(id);
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
    await Cart.deleteCartProductById(id, cod_prod);
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