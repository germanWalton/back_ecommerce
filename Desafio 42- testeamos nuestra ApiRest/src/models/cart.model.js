const mongoose = require("mongoose");
const { Types } = require("mongoose")
const moment = require("moment");
const Product = require('./product.model');
const BaseModel = require('../models/base.model');



class Cart extends BaseModel {
  constructor() {
    const schema = new mongoose.Schema({
      products:{type: Array, default:[]},
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY HH:mm:ss")
      },
      userId:String,
    })

    // this.model = mongoose.model("carts", schema);
    super('carts',schema)
  }
/*
  async getAll() { 
    const data = await this.model.find({})
      .lean()
    
    return data.map((cart) => ({
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }))
  }*/
/*
  async create(product) {
    const cart = await this.model.create(product);
    return {
      id: cart.id,
      userId: cart.userId,
      products:cart.products
    }
  }*/

  async addToCart(cartId, productId) {
    const product = await Product.getById(productId);
    const cart = await this.model.updateOne({ _id: cartId }, { $push: {products: product } })
    return cart;
  }


  async getCartProductsById(id) {
    const cartProducts = await this.model.findById(id);
    return cartProducts.products;
  }

/*
  async getCartById(id) {
    const cart = await this.model.findById(id);
    console.log(cart)
    return cart
  }*/
 
/*
  async deleteById(id) {
   await this.model.findByIdAndDelete(id) 
   }
  */
  
  async deleteCartProductById(cartId, cod_prod) {
    
   await this.model.updateMany({ _id: cartId }, { $pull: { products: { code:cod_prod } } }) 
    
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
  /*
  async update(id, obj) {
    const product = await this.model.updateOne({ _id: id }, { $set: obj })
    return product
  }*/
  
}

module.exports = new Cart();
