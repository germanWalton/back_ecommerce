const express = require("express");
const { Router } = express;
const router = Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/admin");

router.get("/", auth, controller.root);

router.get("/users", auth, controller.users);

router.get("/products", auth, controller.products);

router.get("/pedidos", auth, controller.orders);

router.get("/add/product", auth, controller.formProduct);

router.post("/add/product", auth, controller.addNewProduct);

router.get("/add/user", auth, controller.addUser);

module.exports = router;
