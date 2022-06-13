const supertest = require("supertest");
const expect = require("chai").expect;
const createProduct = require("../util");
const URL = "http://localhost:8080";

//CHAI Y SUPERTEST

describe("API Products", () => {
  const agent = supertest(URL);

  it("should retrieve all products", async () => {
    const response = await agent.get("/api/products");
    expect(response.status).to.equal(200);
  });

  it("should create a new product", async () => {
    const product = createProduct();
    const response = await agent.post("/api/products").send(product);
    const body = response.body;

    expect(body.name).to.equal(product.name);
  });

  it("should retrieve a product by id", async () => {
    const id = "623ddf7a6fedb5ca32a0078e";
    const response = await agent.get(`/api/products/${id}`);
    expect(response.body._id).to.equal(id);
  });
  it("should delete a product", async () => {
    const id = "629f639d6d0fb584b6bf0414";
    const response = await agent.delete(`/api/products/${id}`);
    expect(response.status).to.equal(202);
  });
  it("should update a product", async () => {
    const id = "623ddf7a6fedb5ca32a0078e";
    const updateProduct = { price: 1500};
    const response = await agent.put(`/api/products/${id}`).send(updateProduct);
    const product = await agent.get(`/api/products/${id}`);
    expect(response.status).to.equal(201);
    expect(product.body.price).to.equal(updateProduct.price);
  });
});
