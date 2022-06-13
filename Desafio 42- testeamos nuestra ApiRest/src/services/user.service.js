const ModelFactory = require('../models/factory.model');
const userModel = ModelFactory.getModel('user');
const cartModel = ModelFactory.getModel('cart');


const getAll = async () => {
  return await userModel.getAll()
  
}

const getUserById = async (id) => {
  return await userModel.getById(id)
}

const getCartByUser = async (id) => {
  return await cartModel.getByUser(id)
}

const deleteUser = async (id) => {
  return await userModel.deleteById(id)
}
module.exports= {getAll,getUserById,getCartByUser,deleteUser}