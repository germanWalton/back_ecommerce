const service = require("../services/admin.service");
const passport=require("passport")


const root = async (req, res) => {
  const { name } = req.user;
  const users = await service.getUsers();

  res.render("admin/index", { name: name, users });
};

const users = async (req, res) => {
  const users = await service.getUsers();
  res.render("admin/tableUsers", { users });
};

const products = async (req, res) => {
  const products = await service.getProducts();
  res.render("admin/formProducts", {
    title: "Productos",
    add: "/admin/add/product",
    products,
  });
};

const orders = async (req, res) => {
  const orders = await service.getOrders();
  res.render("admin/ordersTable", { title: "Pedidos", orders });
};

const formProduct = (req, res) => res.render("admin/addProduct");

const addNewProduct = async (req, res) => {
  const { body } = req;
  try {
    await service.createProduct(body);
    res.render("admin/success");
  } catch (error) {
    res.render("admin/error", { error });
  }
};

const formUser = (req, res) => {
  res.render("admin/addUser");
};


const addNewUser = async(req, res) => {
  const { body } = req
  try {
    await service.createUser(body)
    res.redirect("/admin/users")
  } catch (error) {
    console.log(e)
    res.redirect("/admin/addUser")
  }

}

module.exports = {
  root,
  users,
  products,
  orders,
  formProduct,
  addNewProduct,
  formUser,
  addNewUser,
};
