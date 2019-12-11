require('dotenv').config();

const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
// const books = require('./routes/book');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const books = require('./routes/book');

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected'))
  .catch(err => console.error('Cant connect' + err));

const app = express();
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


app.use(books);
