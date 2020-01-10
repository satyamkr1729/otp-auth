/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const readConfig = require('jsonfile').readFileSync;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const otp = require('./controllers/otp-generator');
const countryCodes = require('country-data');

const telephoneCodes = [];
for (const val of Object.values(countryCodes.callingCountries)) {
  if (val.countryCallingCodes && (!telephoneCodes.length || telephoneCodes[telephoneCodes.length - 1].country != val.alpha2)) {
    telephoneCodes.push({country: val.alpha2, emoji: val.emoji, code: val.countryCallingCodes[0]});
  }
}
let config;
try {
  config = readConfig('config.json');
} catch (e) {
  console.log('[error]: server configuration not found');
}

global.__config = config;

const app = express();
app.set('view engine', 'pug');
app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('home.pug', {telephoneCodes});
});

app.post('/login/sendotp', (req, res) => {
  const secret = otp.generateSecret();
  const token = otp.generateOtp(secret);
  otp.sendOtp(req.body.countryCode + req.body.mobile, token);
  res.cookie('secret', secret);
  res.cookie('otp', token);
  res.render('home.pug');
});

app.post('/login/verify', (req, res) => {
  const verdict = otp.verify(req.cookies.secret, req.body.otp);
  if (verdict) {
    res.send('success');
  } else {
    res.send('failure');
  }
});

app.listen(global.__config.port, () => {
  console.log(`Server started at port ${global.__config.port}`);
});
