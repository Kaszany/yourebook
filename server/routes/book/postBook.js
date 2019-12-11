const express = require('express');
const router = express.Router();
const bookModel = require('../../models/Book');

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
