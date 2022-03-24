const express = require("express");
const { Router } = express;
const router = Router();
const cartController = require('../controllers/cartController');


//GET /api/carrito/id/productos

router.get("/:id/productos", cartController.getCartProducts)

//POST /api/carrito

router.post("/", cartController.createCart);

//POST /api/carrito/id/productos

router.post("/:id/productos", cartController.addToCart)

//DELETE  /api/carrito/id

router.delete("/:id", cartController.deleteCartById)

//DELETE  /api/carrito/id/productos/id_prod

router.delete("/:id/productos/:id_prod", cartController.deleteCartProductById)

module.exports = router;
