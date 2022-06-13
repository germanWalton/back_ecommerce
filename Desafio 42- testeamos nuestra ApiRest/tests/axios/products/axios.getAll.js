const axios = require("axios");
const PRODUCTS_URL = "http://localhost:8080/api/products";


const getProducts = async () => {
  try {
    const { data } = await axios.get(PRODUCTS_URL);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};


getProducts()