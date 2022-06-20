const { buildSchema } = require("graphql")

const schema = `
  type Product {
    id: String!
    name: String
    price: Int
    thumbnail: String
    code: String
    stock: Int
    timestamp: String
} 
  input ProductInput {
    name: String!
    price: Int
    thumbnail: String
    code: String
    stock: Int
} 
  type Query {
    getAllProducts(price: Int): [Product]
}
  type Mutation {
    createProduct(data: ProductInput): Product
  }
`
module.exports = buildSchema(schema)