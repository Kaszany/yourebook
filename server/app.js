require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const books = require('./routes/book');

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected'))
  .catch(err => console.error('Cant connect' + err));

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


app.use(books);
