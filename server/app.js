require('dotenv').config();

const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const Grid = require('gridfs-stream');

const authMiddleware = require('./middleware/auth');
const users = require('./routes/users');
const auth = require('./routes/auth');
const books = require('./routes/book');
const favourites = require('./routes/favourites');
const images = require('./routes/uploads/images');
const PDFs = require('./routes/uploads/downloadPDF');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
// Create mongo connection
const conn = mongoose.createConnection(process.env.DATABASE_URL);

// Init gfs
let gfsImage;

conn.once('open', () => {
  // Init stream
  gfsImage = Grid(conn.db, mongoose.mongo);
  gfsImage.collection('Bookcovers');
});

let gfsPDF;
conn.once('open', () => {
  // Init stream
  gfsPDF = Grid(conn.db, mongoose.mongo);
  gfsPDF.collection('PDFs');
});

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected to db'))
  .catch(err => console.error('Cant connect' + err));

const app = express();
app.use(express.json());

app.use('/uploads', (req, res, next) => {
  eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
  res.locals.gfs = gfsImage;
  next();
});

app.use('/api/PDFs.files', (req, res, next) => {
  eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
  res.locals.gfs = gfsPDF;
  next();
});

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/favourites/', authMiddleware, favourites);
app.use('/api/books', authMiddleware, books);
app.use(images);
app.use(PDFs);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
