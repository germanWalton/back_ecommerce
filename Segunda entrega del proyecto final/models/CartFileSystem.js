const fs = require("fs").promises;
const moment = require("moment");
const Product = require("./ProductFileSystem");
const productsList = new Product("./database/products.json");

class Cart {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async createCart() {
    //Crea un carrito y devuelve el id asignado
    try {
      const carts = await this.getAllCarts();
      const cart = {
        id: (carts[carts.length - 1]?.id || 0) + 1,
        timestamp: moment().format("DD/MM/YYYY HH:mm:ss"),
        products: [],
      };

      const data = [...carts, cart];
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
      return { status: "success", message: `Cart created`, cartId: cart.id };
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(cartId, productId) {
    // Agrega un producto al carrito segun su id
    try {
      const products = await productsList.getAll();
      const product = products.find((p) => p.id == productId);
      if (product == undefined) { return null } else {
        const carts = await this.getAllCarts();
        const cartIndex = carts.findIndex((c) => c.id == cartId);
        carts[cartIndex].products.push(product);
        await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
     
        return { "message": "product added" }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCarts() {
    //Devuelve un array con los carritos presente en el archivo
    try {
      const carts = await fs.readFile(this.filePath, "utf-8");
      const data = JSON.parse(carts);
      const array = Array.from(data);
      return array;
    } catch (error) {
      return [];
    }
  }

  async getCartProductsById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id == id);
      if (cart == undefined) {
        return null;
      }
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const findCart = carts.find((c) => c.id == id);
      const cartFilter = carts.filter((c) => c.id != id);
      await fs.writeFile(this.filePath, JSON.stringify(cartFilter, null, 2));
      return findCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCartProductById(cartId, productId) {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((c) => c.id == cartId);
      const producIndex = carts[cartIndex]?.products.findIndex((p) => p.id == productId);

      if (cartIndex > -1 && producIndex >-1) {
        const filterProducts = carts[cartIndex].products.filter(
          (p) => p.id != productId
        );
        carts[cartIndex].products = filterProducts;
        await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        return{"status":"product deleted"}
      } else return null
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Cart;
