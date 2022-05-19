const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/products");
const auth = require("../middlewares/auth");

router.get("/", controller.getAllProducts);

router.get("/:id", controller.getProductById);

router.post("/", auth, controller.saveProduct);

router.put("/:id", auth, controller.updateProductById);

router.delete("/:id", auth, controller.deleteProductById);

module.exports = router;
