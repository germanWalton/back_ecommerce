const axios = require("axios");
const createProduct = require("../util");
const PRODUCTS_URL = "http://localhost:8080/api/products";




const saveProduct = async (product) => {
  try {
    const response = await axios.post(PRODUCTS_URL, product);
    const { data } = await axios.get(PRODUCTS_URL);
    console.log(response.status);
    console.log(data[data.length - 1].name, product.name);
  } catch (e) {
    console.log(e);
  }
};


saveProduct(createProduct());
