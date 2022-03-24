const CartContainer = require("../models/CartContainer");
const cartList = new CartContainer("./database/cart.json");
const CartMongo = require('../models/CartMongo');


const createCart = async (req, res) => {
  try {
    const result = await CartMongo.create();
    res.send(result)
  } catch (e) {
    console.log(e);
    res.status(500).send({error: e.message})}
}

const addToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
  await CartMongo.addToCart(id, productId);
  res.sendStatus(201)
  }
  catch(e) {
    console.log(e);
    res.status(500).send({error: e.message})}
  }
   


const getCartProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const cartProducts = await CartMongo.getCartProductsById(id);
    res.status(200).send(cartProducts);
  } catch (e) {
    console.log(e);
  res.status(404).send({error:"Cart not found"})}
}

const deleteCartById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    await CartMongo.deleteById(id);
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
  const {id,id_prod} = req.params; 

  try {
    await CartMongo.deleteCartProductById(id,id_prod);
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