const orderModel = require('../models/order.model')


const updateOrder = async (orderId,send) => {
 return await orderModel.updateSendOrder(orderId, send)
}





module.exports = {updateOrder}
