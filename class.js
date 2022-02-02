const fs = require("fs").promises;

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async save(obj) {
    //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    try {
      const products = await this.getAll();
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
      const result = products.find((product) => product.id === id);
      result === undefined ? null : result;
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
      const result = products.filter((product) => product.id !== id);
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

module.exports = Contenedor;
