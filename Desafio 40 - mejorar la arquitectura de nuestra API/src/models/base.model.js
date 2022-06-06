const mongoose = require("mongoose");

class BaseModel {
  constructor(modelName,schema) {
    this.model = mongoose.model(modelName,schema);
  }

  async getAll() {
    const data = await this.model.find({}).lean();
    return data;
  }

  async getById(id) {
    const data = await this.model.findById(id).lean();
    return data;
  }

  async deleteById(id) {
    await this.model.findByIdAndDelete(id);
  }

  async update(id, obj) {
    const data = await this.model.updateOne({ _id: id }, { $set: obj });
    return data;
  }

  async save(obj) {
    const data = await this.model.create(obj);
    return data
  }
}

module.exports = BaseModel;
