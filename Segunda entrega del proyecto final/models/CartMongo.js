const mongoose = require("mongoose");
const moment = require("moment");
const ProductMongo = require('../models/ProductMongo');


class Cart {
  constructor() {
    const schema = new mongoose.Schema({
      products:{type: Array, default:[]},
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY HH:mm:ss")
      }
    })

    this.model = mongoose.model("carts", schema);
  }

  async create() {
    const cart = await this.model.create({});
    return cart;
  }

  async addToCart(cartId, productId) {
    const product = await ProductMongo.getById(productId);
    const cart = await this.model.updateOne({ _id: cartId }, { $push: {products: product[0] } })
    return cart;
  }


  async getCartProductsById(id) {
    const cartProducts = await this.model.find({ _id: id });
    return cartProducts[0].products;
  }


  async deleteById(id) {
  await this.model.deleteOne({ _id: id })
    
   }
  
  async deleteCartProductById(cartId, prodId) {
    await this.model.updateMany({ _id: cartId }, { $pull: { products: { name:"Frangelicooo" } } })
    const carrito = await this.model.findById(cartId)
    // carrito.products.remove({ _id: "6239bb88ff26a1b41b28a0ab" })
    console.log(carrito)

  }

  
}

module.exports = new Cart();
