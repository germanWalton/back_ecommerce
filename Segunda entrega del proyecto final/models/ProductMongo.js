const mongoose = require("mongoose");
const moment = require("moment");

class Product {
  constructor() {
    const schema = new mongoose.Schema({
      name: String,
      description: String,
      price: Number,
      thumbnail: String,
      code: String,
      stock: { type: Number, default: 0 },
      timestamp: {
        type: String,
        default: moment().format("DD/MM/YYYY HH:mm:ss"),
      },
    });

    this.model = mongoose.model("products", schema);
  }

  async create(obj) {
    const product = await this.model.create(obj);
    return product._id;
  }

  async getAll(orderBy = "", search = "") {
    let products = [];
    let find = search ? { name: { $regex: search, options: "i" } } : {};
    if (orderBy) {
      const sort = {};
      sort[orderBy] = -1;
      products = await this.model.find(find).sort(sort);
    } else {
      products = await this.model.find(find);
    }
    return products.map((p) => {
      return {
        name: p.name,
        description: p.description,
        price: p.price,
        thumbnail: p.thumbnail,
        code: p.code,
        stock: p.stock,
        id: p["_id"],
        timestamp: p.timestamp,
      };
    });
  }

  async getById(id) {
    const product = await this.model.find({ _id: id });
    return product;
  }

  async getByCode(code) {
    const product = await this.model.find({ code: code });
    return product;
    
  }

  async update(id, obj) {
    const product = await this.model.updateOne({ _id: id }, { $set: obj })
    return product
  }

  async deleteById(id) {
  await this.model.deleteOne({ _id: id })
    
   }
  

  
}

module.exports = new Product();
