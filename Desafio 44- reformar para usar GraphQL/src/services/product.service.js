const ModelFactory = require('../models/factory.model');
const productModel = ModelFactory.getModel('product');


const getProducts = async (orderBy, search) => {
  return await productModel.getAll(orderBy, search);
};

const geyById = async (id) => {
  return await productModel.getById(id);
};

const save = async (obj) => {
//  return await productModel.create(obj);
  return await productModel.save(obj)
};

const update = async (prodId, obj) => {
  return await productModel.update(prodId, obj);
};

const deleteById = async (id) => {
  return await productModel.deleteById(id);
};

module.exports = { getProducts, geyById, save, update, deleteById };
