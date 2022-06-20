const axios = require("axios");
const PRODUCTS_URL = "http://localhost:8080/api/products";



const updateProduct = async (id, body) => {
  try {
    const response = await axios.put(`${PRODUCTS_URL}/${id}`, body);
    console.log(response.status);
  } catch (e) {
    console.log(e);
  }
};

updateProduct("62a208d534e566358cbf9c09", { price: 1700 });
