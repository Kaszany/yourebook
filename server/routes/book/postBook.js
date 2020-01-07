const express = require('express');
const router = express.Router();
const bookModel = require('./../../models/Book');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    if (file.mimetype === 'application/pdf') {
      const fileInfo = {
        filename: `PDF file, Book: ${req.body.title}`,
        bucketName: 'PDFs',
      };
      return fileInfo;
    } else {
      const fileInfo = {
        filename: `Bookcover image, Book: ${req.body.title}`,
        bucketName: 'Bookcovers',
      };
      return fileInfo;
    }
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    callback(null, true);
  } else callback(new Error('Wrong file type!'), false);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  '/api/books',
  upload.fields([
    { name: 'bookCover', maxCount: 1 },
    { name: 'PDF', maxCount: 1 },
  ]),
  async (req, res) => {

    const book = new bookModel.Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
      bookCover: req.files['bookCover'] ? req.files['bookCover'][0].id: null,
      PDF: req.files['PDF'] ? req.files['PDF'][0].id : null,
    });

    try {
      const newBook = await book.save();
      res.status(200).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

module.exports = router;
