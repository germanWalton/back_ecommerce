const CartContainer = require("../models/CartContainer");
const cartList = new CartContainer("./database/cart.json");


const createCart = async (req, res) => {
  const result = await cartList.createCart();
  res.send(result);
}

const addToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = await req.body;
  const add = await cartList.addToCart(id, productId);
   if (add == null) {
     res.status(404).send({
       error: "product not found",
     });
     return;
   } 
   res.sendStatus(201);
}

const getCartProducts = async (req, res) => {
  const { id } = req.params;
  const cartProducts = await cartList.getCartProductsById(id);
  if (!cartProducts) {
    res.status(404).send({
      error: "Cart not found",
    });
    return;
  }
  res.send(JSON.stringify(cartProducts));
}

const deleteCartById = async (req, res) => {
  const { id } = req.params; //parametros de URL
  const cart = await cartList.deleteCartById(id);
   if (cart == undefined) {
     res.status(404).send({
       error: "cart not found",
     });
     return;
   } 
    res.sendStatus(200);
}

const deleteCartProductById = async (req, res) => {
  const { id, id_prod } = req.params; 
  const cart = await cartList.deleteCartProductById(id, id_prod);
  console.log(cart)
  if (cart == null) {
    res.status(404).send({
      error: "Element not found",
    });
    return;
  }
  res.sendStatus(200);

}

module.exports = {createCart,addToCart,getCartProducts,deleteCartById,deleteCartProductById};