/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const client = require('twilio')();
const twilio = {};

twilio.sendMessage = function(message, number) {
  client.messages.create({
    body: message,
    from: global.__config.twilioPhone,
    to: number,
  }).then((message) => console.log(`[success]: Message sent to ${number}`));
};

module.exports = twilio;
