const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require("path");
const db = require('./models').db;
require('dotenv').config();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  db.sync()
  .then(() => console.log('Database is synched!'))
  .catch((err) => console.error('Trouble in flavor town!', err, err.stack));
});