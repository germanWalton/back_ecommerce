module.exports = {
  mongoConfig: {
    HOSTNAME: process.env.HOSTNAME,
    SCHEMA: process.env.SCHEMA,
    USER: process.env.USER,
    PASSWORD: process.env.MONGO_PASSWORD,
    DATABASE: process.env.DATABASE,
    OPTIONS: process.env.OPTIONS,
  },
  mail: {
    GMAIL_PWD: process.env.GMAIL_PASSWORD,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
  },
  twilio: {
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH: process.env.TWILIO_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
  },
}
