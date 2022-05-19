const orderModel = require('../models/Order')
const smsSender = require('../notifications/twilio')

const updateOrder = async (req, res) => {
  const orderId = req.params.orderId
  if (!orderId) {
    return res.sendStatus(404)
  }

  try {
    await orderModel.updateSendOrder(orderId, true)

    smsSender.sendWhatsapp()
    res.sendStatus(202)
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {updateOrder}