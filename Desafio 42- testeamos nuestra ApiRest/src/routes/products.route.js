const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/products.controller");
const auth = require("../middlewares/auth");

router.get("/", controller.getAllProducts);

router.get("/:id", controller.getProductById);

router.post("/", controller.saveProduct);

router.put("/:id", controller.updateProductById);

router.delete("/:id", controller.deleteProductById);

module.exports = router;
