const response = await fetch('https://videogameecommerce.herokuapp.com/api/products')
const products = await response.json()

console.log(products)