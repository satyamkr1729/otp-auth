/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const readConfig = require('jsonfile').readFileSync;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const process = require('process');
const countryCodes = require('country-data');

const login = require('./controllers/routes/login');

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

app.get('/firebase', (req, res) => {
  res.render('verify.pug', {telephoneCodes});
});

app.use('/login', login);

app.listen(process.env.PORT || global.__config.port, () => {
  console.log(`Server started at port ${global.__config.port}`);
});
