const knex = require("knex");
const fs = require("fs/promises")
const path = require("path")


class Chat {
  constructor() {
    this.db = knex({
      client: "sqlite3",
      connection: {
        filename:"././database/chats.sqlite"
      },
      useNullAsDefault:true
    });
  }
  async loadData() {
    try {
      await this.db.schema.dropTableIfExists("chats");
      await this.db.schema.createTable("chats", (table) => {
        table.increments("id")
        table.string("date")
        table.string("email")
        table.string("message")
      })

      const raw = await fs.readFile(path.join(__dirname, "../database/chats.json"), "utf-8");
      const chats = JSON.parse(raw);
      
      for (const chat of chats) {
        await this.db("chats").insert(chat)
      }
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getAll() {
    const chats = await this.db.select().from("chats");
    return chats;
  }
  async getById(id) {
    const chat = await this.db("chats").where({ id }).first();
    return chat;
  }
  
  async create(chat) {
    const result = await this.db("chats").insert(chat);
    return result[0];
  }
  async delete(id) {
    await this.db("chats").where({ id }).del();

  }
}

module.exports = new Chat();
