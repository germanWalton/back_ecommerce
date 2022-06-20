const { faker } = require('@faker-js/faker')

const createProduct = () => ({
  name: faker.commerce.productName(),
  description:faker.commerce.productDescription(),
  price: parseInt(faker.commerce.price()),
  thumbnail: faker.image.food(),
  code:faker.datatype.uuid(),
  stock:parseInt(faker.random.numeric(2))
})

module.exports = createProduct