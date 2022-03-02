const Container = require("../models/Container");
const productsList = new Container("./database/products.json");



const getAllProducts = async (req, res) => {
  const data = await productsList.getAll();
  res.send(JSON.stringify(data));

}

const getProductById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  const product = await productsList.getById(id);
  if (!product) {
    res.status(404).send({
      error: "product not found",
    });
    return;
  }
  res.send(JSON.stringify(product));
}

const saveProduct = async(req, res)=> {
  const { name, description, price, thumbnail, code, stock} = await req.body;
  productsList.save({ name, description, price, thumbnail, code, stock });
   res.sendStatus(201);
}


const updateProductById = async (req, res) => {
  const { id } = req.params; 
  const product = await productsList.getById(id);
  if (!product) {
    res.status(404).send({
      error: "product not found",
    });
    return;
  }
  const obj = req.body;
  productsList.updateById(id, obj);
  res.sendStatus(200);
}

const deleteProductById = async (res, req) => {
  const { id } = req.params; //parametros de URL
  const product = await productsList.getById(id);
  if (!product) {
    res.status(404).send({
      error: "product not found",
    });
    return;
  }

  productsList.deleteById(id);
  res.sendStatus(200);
}


module.exports = {getAllProducts,getProductById,saveProduct,updateProductById,deleteProductById}