const express = require("express");
const { Router } = express;
const router = Router();
const controller = require('../controllers/cart');


//GET /api/carrito/id/productos

router.get("/:id/productos", controller.getCartProducts)

//POST /api/carrito

router.post("/", controller.createCart);

//POST /api/carrito/id/productos

router.post("/:id/productos", controller.addToCart)

//DELETE  /api/carrito/id

router.delete("/:id", controller.deleteCartById)

//DELETE  /api/carrito/id/productos/id_prod

router.delete("/:id/productos/:cod_prod", controller.deleteCartProductById)

module.exports = router;
