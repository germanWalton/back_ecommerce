const ModelFactory = require('../models/factory.model');
const productModel = ModelFactory.getModel('product');
const cartModel = ModelFactory.getModel('cart');
const orderModel = ModelFactory.getModel('order');


const getProducts = async () => {
  return await productModel.getAll()
}

const getCartByUser = async (id) => {
  return await cartModel.getByUser(id)
}

const getProductById = async (id) => {
  return await productModel.getById(id)
}


const saveOrder = async(obj)=>{
  return await orderModel.save(obj)
}

const emptyCart = async (userId) => {
  return await cartModel.emptyCartByUser(userId)
}

module.exports = { getProducts, getCartByUser,getProductById,saveOrder,emptyCart }