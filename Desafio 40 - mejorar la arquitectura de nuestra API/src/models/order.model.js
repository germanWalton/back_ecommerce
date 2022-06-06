const mongoose = require("mongoose");
const moment = require("moment");
const BaseModel = require('../models/base.model');

class Order extends BaseModel {
  constructor() {
    const schema = new mongoose.Schema({
      userId: String,
      total: { type: Number, default: 0 },
      created: {
        type: Date,
        default: moment().format("DD/MM/YYYY HH:mm:ss"),
        send: Boolean,
      },
    });

   // this.model = mongoose.model("order", schema);
    super('order',schema)
  }
/*
  async getAll() {
    const data = await this.model.find({}).lean();

    return data.map((order) => ({
      id: order._id.toString(),
      userId: order.userId,
      total: order.total,
      created: order.created,
      send: order.send ? "Yes" : "No",
    }));
  }
 /*
  async save(obj) {
    const order = await this.model.create(obj);
    return {
      id: order._id.toString(),
      userId: order.userId,
      total: order.total,
      created: order.created,
      send: order.send ? "Yes" : "No",
    };
  }*/
/*
  async deleteById(id) {
    await this.model.deleteOne({ _id: id });
  }*/
/*
  async getById(id) {
    const order = await this.model.findById(id).lean();
    return {
      id: order._id.toString(),
      userId: order.userId,
      total: order.total,
      created: order.created,
      send: order.send ? "Yes" : "No",
    };
  }*/
/*
  async getByUser(id) {
    const order = await this.model.findOne({ userId: id }).lean();

    if (!order) {
      return {};
    }

    return {
      id: order._id.toString(),
      userId: order.userId,
      total: order.total,
      created: order.created,
      send: order.send ? "Yes" : "No",
    };
  }*/
  async updateSendOrder(id, send) {
    const order = await this.model.findById(id);

    order.send = send;

    await order.save();
  }
}


module.exports = new Order()


