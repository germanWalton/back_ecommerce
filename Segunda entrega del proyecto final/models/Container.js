const fs = require("fs").promises;
const moment = require("moment");

class Container {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async save(obj) {
    //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    try {
      const products = await this.getAll();
      obj.timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
      obj.id = (products[products.length - 1]?.id || 0) + 1;
      const data = [...products, obj];
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    //Recibe un id y devuelve un objeto con ese id, o null si no esta
    try {
      const products = await this.getAll();
      const result = products.find((product) => product.id == id);
      if (result == undefined) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, obj) {
    //Recibe un id y modifica el objeto con ese id
    try {
      const products = await this.getAll();
      const index = products.findIndex((p) => p.id == id);

      //Ver como achicar el codigo
       if (!obj.name) { obj.name = products[index].name }
       if (!obj.description) { obj.description = products[index].description }
       if (!obj.price) { obj.price = products[index].price }
       if (!obj.thumbnail) { obj.thumbnail = products[index].thumbnail }
       if (!obj.code) { obj.code = products[index].code }
       if (!obj.stock) { obj.stock = products[index].stock }

       products[index].name = obj.name;
       products[index].description = obj.description;
       products[index].price = obj.price;
       products[index].thumbnail = obj.thumbnail;
       products[index].code = obj.code;
       products[index].stock = obj.stock;

      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    //Devuelve un array con los objetos presentes en el archivo
    try {
      const products = await fs.readFile(this.filePath, "utf-8");
      const data = JSON.parse(products);
      const array = Array.from(data);
      return array;
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    //Elimina del archivo el objeto con el id buscado
    try {
      const products = await this.getAll();
      const result = products.filter((product) => product.id != id);
      await fs.writeFile(this.filePath, JSON.stringify(result, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    //Elimina todos los objetos presentes en el archivo
    try {
      await fs.writeFile(this.filePath, "");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;
