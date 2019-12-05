const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['romance', 'fantasy', 'horror', 'crime', 'thriller'],
  },
  year: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

exports.Book = Book;
