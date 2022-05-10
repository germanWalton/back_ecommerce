const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/products");
const auth = require("../middlewares/auth");

//GET /api/productos

router.get("/", controller.getAllProducts);

//GET /api/productos/id

router.get("/:id", controller.getProductById);

//POST /api/productos

router.post("/", auth(true, "productos"), controller.saveProduct);

//PUT api/productos/id

router.put(
  "/:id",
  auth(true, "productos"),
  controller.updateProductById
);

//DELETE /productos/id

router.delete(
  "/:id",
  auth(true, "productos"),
  controller.deleteProductById
);

module.exports = router;
