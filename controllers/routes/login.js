/* eslint-disable linebreak-style */
/* eslint-disable max-len */
// eslint-disable-next-line new-cap
const router = require('express').Router();
const countryCodes = require('country-data');
const otp = require('../models/otp-generator');

const telephoneCodes = [];
for (const val of Object.values(countryCodes.callingCountries)) {
  if (val.countryCallingCodes && (!telephoneCodes.length || telephoneCodes[telephoneCodes.length - 1].country != val.alpha2)) {
    telephoneCodes.push({country: val.alpha2, emoji: val.emoji, code: val.countryCallingCodes[0]});
  }
}

router.get('/', (req, res) => {
  res.render('login.pug', {telephoneCodes});
});

router.post('/sendotp', (req, res) => {
  const secret = otp.generateSecret();
  const token = otp.generateOtp(secret);
  otp.sendOtp(req.body.countryCode + req.body.mobile, token);
  res.cookie('secret', secret, {expires: new Date(Date.now() + 24 * 3600000)});
  res.render('otp.pug');
});

router.post('/verify', (req, res) => {
  const verdict = otp.verify(req.cookies.secret, req.body.otp);
  if (verdict) {
    res.render('home.pug');
  } else {
    res.render('otp.pug', {retry: true});
  }
});

module.exports = router;
