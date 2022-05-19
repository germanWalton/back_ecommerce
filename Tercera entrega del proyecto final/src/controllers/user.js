const userModel = require("../models/User");
const cartModel = require("../models/Cart");

const root = async (req, res) => res.send(await userModel.getAll());

const currentUser = async (req, res) => {
  if (!req.session) {
    return res.sendStatus(404);
  }

  const userId = req.session.passport.user;
  const user = await userModel.getById(userId);
  const cart = await cartModel.getByUser(userId);

  res.send({
    ...user,
    cartId: cart.id,
  });
};

const userById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.sendStatus(404);
  }

  const user = await userModel.getById(userId);
  const cart = await cartModel.getByUser(userId);

  res.send({
    ...user,
    cartId: cart.id,
  });
};

module.exports = { root, currentUser, userById };
