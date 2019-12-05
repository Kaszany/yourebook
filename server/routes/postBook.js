const express = require('express');
const router = express.Router();
const bookModel = require('../models/Book');

router.post('/api/books', async (req, res) => {
  const book = new bookModel.Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  });

  try {
    const newBook = await book.save();
    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// const mongoose = require('mongoose')

// const bookModel = require('./../models/Book.js')

// async function addBook() {
//     const book = new bookModel.Book ({
//       title: '50 shades of grey',
//       author: 'E. L. James',
//       genre: 'romance',
//       year: 2011
//     });

//     const result = await book.save();
//     console.log(result);
//     }

//     exports.addBook = addBook();
