const mongoose = require("mongoose");
const moment = require("moment");
const Product = require('../models/Product');


class Cart {
  constructor() {
    const schema = new mongoose.Schema({
      products:{type: Array, default:[]},
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY HH:mm:ss")
      },
      userId:String
    })

    this.model = mongoose.model("carts", schema);
  }

  async getAll() { 
    const data = await this.model.find({})
      .lean()
    
    return data.map((cart) => ({
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }))
  }

  async create(product={}) {
    const cart = await this.model.create(product);
    return cart;
  }

  async addToCart(cartId, productId) {
    const product = await Product.getById(productId);
    const cart = await this.model.updateOne({ _id: cartId }, { $push: {products: product[0] } })
    return cart;
  }


  async getCartProductsById(id) {
    const cartProducts = await this.model.findById(id);
    return cartProducts.products;
  }


  async deleteById(id) {
   await this.model.findByIdAndDelete(id) 
   }
  
  
  async deleteCartProductById(cartId, cod_prod) {
    const product = await Product.getByCode(cod_prod)
    if(product[0]==undefined){throw new Error('Product not found')}
    await this.model.updateMany({ _id: cartId }, { $pull: { products: { code: cod_prod } } }) 
    
  }
  

  async getByUser(id) { 
    const cart =  await this.model.findOne({ userId: id }).lean()
    
    if (!cart) {
      return {}
    }

    return {
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }
  }
  async emptyCartByUser(userId) { 
    const cart =  await this.model.findOne({ userId })

    cart.products = []

    await cart.create()
  }
  
}

module.exports = new Cart();
