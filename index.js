/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const readConfig = require('jsonfile').readFileSync;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const login = require('./controllers/routes/login');

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

app.use('/login', login);

app.listen(global.__config.port, () => {
  console.log(`Server started at port ${global.__config.port}`);
});
