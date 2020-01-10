/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const process = require('process');
const countryCodes = require('country-data');
// eslint-disable-next-line new-cap
const router = require('express').Router();

const telephoneCodes = [];
for (const val of Object.values(countryCodes.callingCountries)) {
  if (val.countryCallingCodes && (!telephoneCodes.length || telephoneCodes[telephoneCodes.length - 1].country != val.alpha2)) {
    telephoneCodes.push({country: val.alpha2, emoji: val.emoji, code: val.countryCallingCodes[0]});
  }
}

router.get('/', (req, res) => {
  res.render('verify.pug', {telephoneCodes});
});

router.get('/apikey', (req, res) => {
  res.json({apiKey: process.env.FIREBASE_APIKEY});
});

module.exports = router;
