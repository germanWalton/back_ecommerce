const { Schema, model } = require("mongoose");
const moment = require("moment");
const { schema, normalize } = require("normalizr");
const faker = require("faker");

class Message {
  constructor() {
    
    const messagesSchema = new Schema({
      author: {
        email: { type:String,default:faker.internet.email() },
        name: {type:String, default:faker.name.firstName() },
        lastName: {type:String,default:faker.name.lastName()},
        age: { type: Number, default:faker.datatype.number() },
        alias: { type: String, default: faker.internet.userName() },
        avatar: { type: String, defualt:faker.internet.avatar()}
      },
      text: String,
      date: { type: String, default: moment().format("DD/MM/YYYY HH:mm:ss") },
    });

    this.model = model("messages", messagesSchema);
  }

  async saveMessage(message) {
     await this.model.create(message)
  }
  
  async readMessages() {
    const author = new schema.Entity("authors", {}, { idAttribute: "email" });
    const message = new schema.Entity("messages", {
      author:author
    })
    const data = new schema.Entity("data", {
      messages:[message]
    })
    const dbMessages = await this.model.find({})

    const normalizeData = normalize({
      id: "messages",
      messages: dbMessages.map((d) => {
        return {
          author: d.author,
          text: d.text,
          id: d._id.toString(),
          date: d.date
        }
      })
    }, data) 

    console.log(normalizeData);
    return normalizeData
  }
}

module.exports = new Message()