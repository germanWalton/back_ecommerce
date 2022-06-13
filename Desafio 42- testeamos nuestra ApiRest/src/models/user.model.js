const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const BaseModel = require('../models/base.model');


class User extends BaseModel{
  constructor() {
    const schema = new mongoose.Schema({
      email: String,
      name: String,
      lastname: String,
      direction: String,
      age: Number,
      phone: String,
      avatar:String,
      password: String
    });

    super('users',schema)
  }

  //async getAll() {
   // const data = await this.model.find({}).lean()
    //return data
  //}

  async create(obj) {
    obj.password = await bcrypt.hash(obj.password, 10);
   return await this.model.create(obj);

  }

  async existsByEmail(email) {
    return await this.model.exists({ email });
  }

  //async deleteById(id) {
 //   return await this.model.deleteOne({_id: id })
//}

  async getByEmail(email) {
    const user = await this.model.findOne({ email });
    return {
      id:user._id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      direction: user.direction,
      age: user.age,
      phone: user.phone,
      avatar:user.avatar
      
    }
  }

 // async getById(id) {
   // return await this.model.findById(id)
   
  //}

  async isPasswordValid(email,password) {
    const user = await this.model.findOne({ email });
    
    return await bcrypt.compare(password, user.password);

  }
  
  //async update(id, obj) {
    //const product = await this.model.updateOne({ _id: id }, { $set: obj })
    //return product
  //}
  
}

module.exports = new User();
