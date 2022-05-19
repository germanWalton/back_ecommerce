const passport = require("passport");
const mailSender = require("../notifications/mail");
const twilio = require("../notifications/twilio");
const productModel = require("../models/Product");
const cartModel = require("../models/Cart");
const orderModel = require("../models/Order");
const logger = require("../log/index");

const root = async (req, res) => {
  const { name, id } = req.user;
  const products = await productModel.getAll();
  const cart = await cartModel.getByUser(id);
  res.render("main", { name, products, cartId: cart.id });
};

const loginForm = (req, res) => {
  res.render("login", { layout: "login" });
};

const registerForm = (req, res) => {
  res.render("register", { layout: "login" });
};

const login = passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

const register = passport.authenticate("register", {
  successRedirect: "/",
  failureRedirect: "/register",
  failureFlash: true,
});

const logout = (req, res) => {
  const { name } = req.user;
  req.logOut();
  res.render("logout", { layout: "logout", name });
};

const cart = async (req, res) => {
  const { id } = req.user;

  const cart = await cartModel.getByUser(id);
  const products = await Promise.all(
    cart.products.map((pId) => productModel.getById(pId))
  );
  const total = products.reduce((tot, p) => tot + p.price, 0);

  res.render("cart", { cartId: cart.id, products, total });
};

const order = async (req, res) => {
  const { id, email } = req.user;
  const context = { sent: false };

  const cart = await cartModel.getByUser(id);
  const products = await Promise.all(
    cart.products.map((pId) => productModel.getById(pId))
  );

  const total = products.reduce((tot, p) => tot + p.price, 0);

  try {
    await orderModel.save({
      userId: id,
      total,
    });
    await cartModel.emptyCartByUser(id);

    const elementosDeProducto = products.map((p) => `<li>${p.name}</li>`);
    const template = `
      <h1 style="color: blue;"> Tu pedido esta siendo procesado </h1>
      <p>Aqui tus productos: </p>
      <ul>
        ${elementosDeProducto.join(" ")}
      </ul>
    `;
    mailSender.send(template, email);
    context.sent = true;
  } catch (e) {
    logger.error(e);
  }

  res.render("pedido", context);
};

module.exports = {
  root,
  loginForm,
  registerForm,
  login,
  register,
  logout,
  cart,
  order,
};
