const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv')

dotenv.config()


const TOKEN = process.env.MAILTRAP_TOKEN

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Ayush Chistropher Jonas Santos Louis Watsonn",
};

module.exports = {client,sender}