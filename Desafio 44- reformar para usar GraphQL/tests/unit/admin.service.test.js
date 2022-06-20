require("dotenv/config");
const assert = require("assert").strict;
const adminService = require("../../src/services/admin.service");
const config = require("../../src/config/index");
const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } =
  config.mongoConfig;
const mongoose = require("mongoose");

//MOCHA

describe("Admin service", () => {
  before(async () => {
    await mongoose.connect(
      `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
    )
    console.log("Antes de todas las pruebas");
  });

  beforeEach(() => {
    console.log("Antes de cada prueba");
  });

  after(() => {
    mongoose.disconnect();
  });

  afterEach(() => {
    console.log("Despues de cada prueba");
  });

  it("should connect to db", () => {
    assert.strictEqual(mongoose.connection.readyState, 1);
  });

  it("should retrieve all users", async() => {
    const users = await adminService.getUsers();
    console.log(users.length)
    assert.strictEqual(users.length >= 0, true);
  });
});
