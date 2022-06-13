const ModelFactory = require('../models/factory.model');
const orderModel = ModelFactory.getModel('order');
const productModel = ModelFactory.getModel('product');
const userModel = ModelFactory.getModel('user');

const getUsers = async () => {
  return await userModel.getAll()
}

const getProducts = async() => {
  return await productModel.getAll()
}

const getOrders = async () => {
  return await orderModel.getAll()
}

const createProduct = async (obj) => {
 return await productModel.create(obj)
}


const createUser = async (obj) => {
  return await userModel.create(obj)
}

module.exports= {getProducts,getOrders,createProduct,getUsers,createUser}
