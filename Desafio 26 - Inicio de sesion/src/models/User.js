const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

class User {
  constructor() {
    const schema = new mongoose.Schema({
      email: String,
      name: String,
      lastname: String,
      password: String
    });

    this.model = mongoose.model("users", schema);
  }

  async create(obj) {
    obj.password = await bcrypt.hash(obj.password, 10);
    return await this.model.create(obj);
  }

  async existsByEmail(email) {
    return await this.model.exists({ email });
  }


  async getByEmail(email) {
    const user = await this.model.findOne({ email });
    return {
      id:user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      
    }
  }

  async isPasswordValid(email,password) {
    const user = await this.model.findOne({ email });
    
    return await bcrypt.compare(password, user.password);

  }
  

  
}

module.exports = new User();
