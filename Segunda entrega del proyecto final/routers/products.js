const express = require("express");
const { Router } = express;
const router = Router();
const productsController = require("../controllers/productsController");
const auth = require("../middlewares/auth");

//GET /api/productos

router.get("/", productsController.getAllProducts);

//GET /api/productos/id

router.get("/:id", productsController.getProductById);

//POST /api/productos

router.post("/", auth(true, "productos"), productsController.saveProduct);

//PUT api/productos/id

router.put(
  "/:id",
  auth(true, "productos"),
  productsController.updateProductById
);

//DELETE /productos/id

router.delete(
  "/:id",
  auth(true, "productos"),
  productsController.deleteProductById
);

module.exports = router;
