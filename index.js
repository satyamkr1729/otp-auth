/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
app.set('view engine', 'pug');
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', (req, res) => {
  res.render('home.pug');
});

app.listen(8081, () => {
  console.log('Server started at port 8081');
});
