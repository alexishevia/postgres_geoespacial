const express = require('express');
const cors = require('cors');
const app = express();
const massive = require('massive');

app.use(cors());

// connect massive.js
app.use((req, res, next) => {
  if (app.get('db')) return next();
  massive({ connectionString : process.env.DATABASE_URL })
  .then(instance => app.set('db', instance))
  .then(() => next())
  .catch(err => next(err));
});

app.get('/', function (req, res) {
  res.send('Backend is Working!')
});

app.use('/stops', require('./stops'));

module.exports = app;
