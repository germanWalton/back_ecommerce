const moment = require("moment");
const app = require('../config/firebase')

class Product {
  constructor() {
    const { getFirestore } = require("firebase-admin/firestore")
    this.db = getFirestore().collection("products");
  }

  async getAll() {
    const data = await this.db.get();
    let docs = data.docs;
    const items = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  }

  async create(obj) {
    const { id } = await this.db.add({
      ...obj,
      timestamp: moment().format("DD/MM/YYYY HH:mm:ss"),
    });
    return id;
  }

  async getById(id) {
    const product = await this.db.doc(id).get();
    if (!product.exists) {
      return undefined;
    }
    return { ...product.data(), id: product.id };
  }

  async getByCode(code) {
    const products = await this.getAll();
    const findProduct = products.find(p => p.code === code);
    return findProduct;
  }

  async update(id, obj) {
    await this.db.doc(id).update({ ...obj });
  }

  async deleteById(id) {
    const product = await this.db.doc(id).get();
    if(!product.exists){throw new Error('Product not found')}
    await this.db.doc(id).delete();
  
  }
}

module.exports = new Product();
