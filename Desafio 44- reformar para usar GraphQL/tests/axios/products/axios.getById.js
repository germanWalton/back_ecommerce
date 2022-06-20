const axios = require("axios");
const PRODUCTS_URL = "http://localhost:8080/api/products";


const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${PRODUCTS_URL}/${id}`);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};


getProductById("62a208d534e566358cbf9c09");
