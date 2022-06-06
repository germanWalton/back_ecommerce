const ModelFactory = require('../models/factory.model');
const cartModel = ModelFactory.getModel('cart');


const saveCart = async(obj) => {
  //const cart = await cartModel.create(obj)
  const cart = await cartModel.save(obj)
  return cart
}

const getAll = async () => {
 return await cartModel.getAll()
}


const getById = async (id) => {
  // return await cartModel.getCartById(id)
  return await cartModel.getById(id)
}

const addToCart = async (id, prodId) => {
  return await cartModel.addToCart(id,prodId)
}

const cartProductsById = async (id) => {
 return await cartModel.getCartProductsById(id)
}

const deleteCartById = async (id) => {
  return await cartModel.deleteById(id)
}

const deleteCartProduct = async (id,prodCode) => {
  return await cartModel.deleteCartProductById(id,prodCode)
}
module.exports={saveCart,getAll,getById,addToCart,cartProductsById,deleteCartById,deleteCartProduct}