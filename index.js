/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const otp = require('./controllers/otp-generator');

const app = express();
app.set('view engine', 'pug');
app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('home.pug');
});

app.post('/login/sendotp', (req, res) => {
  const secret = otp.generateSecret();
  const token = otp.generateOtp(secret);
  otp.sendOtp(req.body.mobile, token);
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

app.listen(4000, () => {
  console.log('Server started at port 4000');
});
