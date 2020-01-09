/* eslint-disable linebreak-style */
const speakeasy = require('speakeasy');

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
};

otp.verify = function(secret, token) {
  return speakeasy.totp.verify({
    secret,
    token,
    encoding: 'base32',
  });
};

module.exports = otp;
