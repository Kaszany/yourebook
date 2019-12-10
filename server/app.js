require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected'))
  .catch(err => console.error('Cant connect' + err));

const app = express();
app.use(express.json());

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
