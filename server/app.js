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

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/api/products', (req, res) => {
  res.send('products');
});

app.get('/api/customers', (req, res) => {
  res.send('customers');
});

// Posting ebook
app.use('/', require('./routes/postBook'));
