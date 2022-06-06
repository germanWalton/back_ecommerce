//const CartModel = require("../models/cart.model");
const logger = require("../log/index");
const service = require('../services/cart.service')

const createCart = async (req, res) => {
  // const {userId} = req.passport.session.userId
  const { product } = req.body;

  try {
    const cart = await service.saveCart(product)
    res.send(cart);
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
};

const getAllCarts = async (req, res) => {
  res.send(await service.getAll())
}

const getCartById = async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }
  res.send(await service.getById(req.params.id))
}

const addToCart = async (req, res) => {
  const { id,productId } = req.params;
  try {
    await service.addToCart(id, productId);
    res.sendStatus(201);
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: "Cart or product not found" });
  }
};

const getCartProducts = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(await service.cartProductsById(id));
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: e.message });
  }
};

const deleteCartById = async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteCartById(id)
    res.sendStatus(202);
  } catch (e) {
    logger.error(e);
    res.status(404).send({
      error: "cart not found",
    });
  }
};

const deleteCartProductById = async (req, res) => {
  const { id, prodCode } = req.params;

  try {
    await service.deleteCartProduct(id,prodCode)
    res.sendStatus(202);
  } catch (e) {
    logger.error(e);
    res.status(404).send({
      error: "Element not found",
    });
  }
};

module.exports = {
  createCart,
  addToCart,
  getCartProducts,
  deleteCartById,
  deleteCartProductById,
  getAllCarts,
  getCartById
};
