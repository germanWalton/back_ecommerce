module.exports = {
  HOSTNAME: "cluster0.pmdmt.mongodb.net",
  SCHEMA: "mongodb+srv",
  USER: "germanWalton",
  PASSWORD: process.env.MONGO_PASSWORD,
  DATABASE: "ecommerce",
  OPTIONS: "retryWrites=true&w=majority"
}