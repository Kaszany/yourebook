const express = require('express');
const router = express.Router();
const bookModel = require('../models/Book');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    const fileInfo = {
      filename: `Book cover of ${req.body.title}`,
      bucketName: 'bookCovers',
    };
    return fileInfo;
  },
});

const fileFilter = async (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else callback(new Error('Wrong file type!'), false);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: fileFilter,
});

router.post('/api/books', upload.single('bookCover'), async (req, res) => {
  const book = new bookModel.Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    bookCover: req.file.id,
  });

  try {
    const newBook = await book.save();
    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
