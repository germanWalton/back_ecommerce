const smsSender = require('../notifications/twilio')
const service = require('../services/notifications.service')

const updateOrder = async (req, res) => {
  const orderId = req.params.orderId
  if (!orderId) {
    return res.sendStatus(404)
  }

  try {
    await service.updateOrder(orderId,true)

    smsSender.sendWhatsapp()
    res.sendStatus(202)
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {updateOrder}