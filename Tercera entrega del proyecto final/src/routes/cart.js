const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/cart");

router.get("/:id/productos", controller.getCartProducts);

router.post("/", controller.createCart);

router.post("/:id/productos", controller.addToCart);

router.delete("/:id", controller.deleteCartById);

router.delete("/:id/productos/:cod_prod", controller.deleteCartProductById);

module.exports = router;
