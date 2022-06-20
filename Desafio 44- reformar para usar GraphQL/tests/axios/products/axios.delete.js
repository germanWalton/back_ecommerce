const axios = require("axios");
const PRODUCTS_URL = "http://localhost:8080/api/products";




const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${PRODUCTS_URL}/${id}`);
    console.log(response.status);
  } catch (e) {
    console.log(e);
  }
};



deleteProduct("623ddf7a6fedb5ca32a0078e");
