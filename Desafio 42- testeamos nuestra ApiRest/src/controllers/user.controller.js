const service = require('../services/user.service')

const root = async (req, res) => res.send(await service.getAll());

const currentUser = async (req, res) => {
  if (!req.session) {
    return res.sendStatus(404);
  }

  const userId = req.session.passport.user;
  const user = await service.getUserById(userId);
  const cart = await service.getCartByUser(userId);

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

  const user = await service.getUserById(userId);
  const cart = await service.getCartByUser(userId);

  res.send({
    ...user,
    cartId: cart.id,
  });
};

const deleteById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.sendStatus(404);
  }
  res.send(await service.deleteUser(userId))
}
module.exports = { root, currentUser, userById,deleteById };
