const logger = require("../log/index");
const service = require('../services/product.service')

const getAllProducts = async (req, res) => {
  const { orderBy, search } = req.query;
  try {
    res.send(await service.getProducts(orderBy,search));
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    res.send(await service.geyById(id));
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: "Product not found" });
  }
};

const saveProduct = async (req, res) => {
  const { body } = req;
  try {
    res.status(201).send(await service.save(body));
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await service.update(id, body);
    res.sendStatus(201);
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: "Product not found" });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  try {
    await service.deleteById(id);
    res.sendStatus(202);
  } catch (e) {
    logger.error(e);
    res.status(404).send({ error: "Product not found" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
};
