const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");


const getAll = async () => {
  return await userModel.getAll()
}

const getUserById = async (id) => {
  return await userModel.getById(id)
}

const getCartByUser = async (id) => {
  return await cartModel.getByUser(id)
}
module.exports= {getAll,getUserById,getCartByUser}