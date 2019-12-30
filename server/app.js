require('dotenv').config();

const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const Grid = require('gridfs-stream');
// const books = require('./routes/book');
const users = require('./routes/users');
const auth = require('./routes/auth');
const books = require('./routes/book');
const images = require('./routes/uploads/images');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
// Create mongo connection
const conn = mongoose.createConnection(process.env.DATABASE_URL);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('Bookcovers');
});

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected to db'))
  .catch(err => console.error('Cant connect' + err));

const app = express();
app.use(express.json());

//TODO: przenieść do middleware
app.use('/uploads', (req, res, next) => {
  res.locals.gfs = gfs;
  next();
});

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use(books);
app.use(images);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
