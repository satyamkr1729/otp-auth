/* eslint-disable linebreak-style */
const speakeasy = require('speakeasy');
const twilio = require('./twilio');

const otp = {};

otp.generateSecret = function() {
  return speakeasy.generateSecret({length: 20}).base32;
};

otp.generateOtp = function(secret) {
  return speakeasy.totp({
    secret,
    encoding: 'base32',
  });
};

otp.sendOtp = function(number, token) {
  console.log(number);
  console.log(token);
  twilio.sendMessage(`Your OTP for login is ${token}`, number);
};

otp.verify = function(secret, token) {
  return speakeasy.totp.verify({
    secret,
    token,
    encoding: 'base32',
    window: 1,
  });
};

module.exports = otp;
