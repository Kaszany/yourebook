const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // minlength: 2,
    maxlenght: 128,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 128,
  },
  genre: {
    type: String,
    required: true,
    enum: ['romance', 'fantasy', 'horror', 'crime', 'thriller', 'scifi', 'academic'],
  },
  year: {
    type: Number,
    required: true,
    min: 0,
    max: 2021,
  },
  bookCover: {
    type: String,
    required: false,
  },
  PDF: {
    type: String,
    required: false,
  },
});

const Book = mongoose.model('Book', bookSchema);

exports.Book = Book;
