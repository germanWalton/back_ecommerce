const ModelFactory = require('../models/factory.model');
const orderModel = ModelFactory.getModel('order');



const updateOrder = async (orderId,send) => {
 return await orderModel.updateSendOrder(orderId, send)
}





module.exports = {updateOrder}
