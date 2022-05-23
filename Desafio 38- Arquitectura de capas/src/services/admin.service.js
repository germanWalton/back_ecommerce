const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");


const getProducts = async() => {
  const products = await productModel.getAll()
  return products
}

const getOrders = async () => {
  const orders = await orderModel.getAll()
  return orders
}

const createProduct = async (obj) => {
  await productModel.create(obj)
}


module.exports= {getProducts,getOrders,createProduct}
