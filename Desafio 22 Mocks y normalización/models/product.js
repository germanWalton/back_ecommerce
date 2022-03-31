const knex = require("knex");
const fs = require("fs/promises")
const path = require("path")


class Product {
  constructor() {
    this.db = knex({
      client: "mysql",
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "products_db",
      },
    });
  }
  async loadData() {
    try {
      await this.db.schema.dropTableIfExists("products");
      await this.db.schema.createTable("products", (table) => {
        table.increments("id")
        table.string("name")
        table.integer("price")
        table.string("thumbnail")
      })

      const raw = await fs.readFile(path.join(__dirname, "../database/products.json"), "utf-8");
      const products = JSON.parse(raw);
      
      for (const product of products) {
        console.log(product)
        await this.db("products").insert(product)
      }
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getAll(name='') {
   const products = await this.db("products").whereILike("name", `%${name}%`).orderBy("name")
   return products;
  }
  async getById(id) {
    const product = await this.db("products").where({ id }).first();
    return product;
  }
  async update(id, product) {
    await this.db("products").where({id}).update(product)
  }
  async create(product) {
    const result = await this.db("products").insert(product);
    return result[0];
  }
  async delete(id) {
    await this.db("products").where({ id }).del();

  }
}

module.exports = new Product();
