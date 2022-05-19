const orderModel = require("../models/Order");
const productModel = require("../models/Product");

const root = (req, res) => {
  const { name } = req.user;
  res.render("admin/index", { name: `${name} ` });
};

const users = (req, res) => {
  res.render("admin/formProducts", {
    title: "Usuarios",
    add: "/admin/add/user",
  });
};

const products = async (req, res) => {
  const products = await productModel.getAll();
  res.render("admin/formProducts", {
    title: "Productos",
    add: "/admin/add/product",
    products,
  });
};

const orders = async (req, res) => {
  const orders = await orderModel.getAll();
  res.render("admin/ordersTable", { title: "Pedidos", orders });
};

const formProduct = (req, res) => res.render("admin/addProduct");

const addNewProduct = async (req, res) => {
  const { body } = req;
  try {
    await productModel.create(body);
    res.render("admin/success");
  } catch (error) {
    res.render("admin/error", { error });
  }
};

const addUser = (req, res) => {
  res.render("admin/addUser");
};

module.exports = {
  root,
  users,
  products,
  orders,
  formProduct,
  addNewProduct,
  addUser,
};
