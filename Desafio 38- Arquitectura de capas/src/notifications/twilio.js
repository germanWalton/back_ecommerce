const twilio = require("twilio");
const config = require("../config");
const { TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE } = config.twilio;
const logger = require('../log/index');

class SmsSender {
  constructor() {
    this.client = twilio(TWILIO_SID, TWILIO_AUTH);
  }
  async send(phone) {
    try {
      const response = await this.client.messages.create({
        body: "Tu pedido va en camino",
        from: TWILIO_PHONE,
        to: phone,
      });
      logger.info(response);
    } catch (e) {
      logger.error(e);
    }
  }
  async sendWhatsapp(phone = 'whatsapp:+5491167125706') {
    try {
      const response = await this.client.messages.create({
        body: "Tu pedido va en camino",
        mediaUrl:['https://www.latercera.com/resizer/WGoiHOQkK0_UHJtIrnx_vVLLiJY=/arc-anglerfish-arc2-prod-copesa/public/FBP63PQ5T5HLVK57QGK627UCAI.jpg'],
        from: 'whatsapp:+14155238886',
        to: phone,
      });
      logger.info(response);
    } catch (e) {
      logger.error(e);
    }
  }
}

module.exports = new SmsSender();
