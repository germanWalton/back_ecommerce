const nodemailer = require("nodemailer");
const config = require('../config/index');
const logger = require('../log/index')

const {GMAIL_PWD, GMAIL_ADDRESS} = config.mail

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: GMAIL_ADDRESS,
        pass: GMAIL_PWD,
      },
      tls: {
        rejectUnauthorized: false
    }
    });
  }

  async send(template,email='waltongerman@gmail.com') {
    const mailOptions = {
      from: 'Notifications <no-reply@waltonbakery.com>',
      subject: 'Your order in Walton Bakery',
      to: email,
      html: template,
      attachments: [{
        path:__dirname + '/pedido.jpg'
      }]
    }
    const response = await this.transporter.sendMail(mailOptions)
    logger.info(response)
 }
}

module.exports = new MailSender();
