const moment = require("moment");
const product = require('./ProductFirebase')
const app = require('../config/firebase')

class Cart {
  constructor() {
    const { getFirestore } = require("firebase-admin/firestore")
    this.db = getFirestore().collection("carts");
  }

  async create() {
    const { id } = await this.db.add({
      timestamp: moment().format("DD/MM/YYYY HH:mm:ss"),
      products:[]
    });
    return id;
  }


  async addToCart(id, prodId) {
    const cart = await this.db.doc(id).get();
    const cartProducts = cart.data().products;
    const dataProduct = await product.getById(prodId);
    const newData = [{ ...cartProducts },{ ...dataProduct }];
    if (cart.data() == undefined || dataProduct == undefined) { throw new Error('Cart or product not found') }
    await this.db.doc(id).update({ products: dataProduct })
  //  console.log(cartProducts.length)
  }


   async getCartProductsById(id) {
    const cart = await this.db.doc(id).get();
    if(cart.data()== undefined){throw new Error('Cart not found')}
     return cart.data().products
  }

 

  async deleteById(id) {
    const cart = await this.db.doc(id).get();
    if(!cart.exists){throw new Error('Cart not found')}
    await this.db.doc(id).delete();
}
}

module.exports = new Cart();
