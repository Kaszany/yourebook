require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const books = [
{id:1, title: "50 shades of grey", author: "E. L. James", genre: "romance", year: 2011,},
{id:2, title: "Games of thrones", author: "George R. R. Martin", genre: "fantasy", year: 2011,},
{id:3, title: "Dying of the Light", author: "George R. R. Martin", genre: "fantasy", year: 1977,},
{id:4, title: "Dracula", author: "Bram Stoker", genre: "gothic novel", year :1897,},
{id:5, title: "Dracula", author: "Bram Stoker", genre: "gothic novel", year :1897,},
{id:6, title: "Dracula", author: "Bram Stoker", genre: "gothic novel", year :1897,},
];

app.get('/api/books', (req, res) => {
  res.send(books);
});

app.get('/api/books/ID_:id', (req, res) => {
  var book = [];
  for (var i = 0; i < books.length; i++){
  if (books[i].id === parseInt(req.params.id)){
    book.push(books[i]); 
    }
  }
  if (book.length > 0){
      res.send(book);
  }
  else{
  res.status(404).send('The ebook was not found');
  }
});

app.get('/api/books/TITLE_:title', (req, res) => {
  var book = [];
  for (var i = 0; i < books.length; i++){
  if (books[i].title === req.params.title){
    book.push(books[i]); 
    }
  }
  if (book.length > 0){
      res.send(book);
  }
  else{
  res.status(404).send('The ebook was not found');
  }
});

app.get('/api/books/YEAR_:year', (req, res) => {
  var book = [];
  for (var i = 0; i < books.length; i++){
  if (books[i].year === parseInt(req.params.year)){
    book.push(books[i]); 
    }
  }
  if (book.length > 0){
      res.send(book);
  }
  else{
  res.status(404).send('The ebook was not found');
  }
});

app.get('/api/books/AUTHOR_:author', (req, res) => {
  var book = [];
  for (var i = 0; i < books.length; i++){
  if (books[i].author === req.params.author){
    book.push(books[i]); 
    }
  }
  if (book.length > 0){
      res.send(book);
  }
  else{
  res.status(404).send('The ebook was not found');
  }
});

app.get('/api/books/GENRE_:genre', (req, res) => {
  var book = [];
  for (var i = 0; i < books.length; i++){
  if (books[i].genre === req.params.genre){
    book.push(books[i]); 
    }
  }
  if (book.length > 0){
      res.send(book);
  }
  else{
  res.status(404).send('The ebook was not found');
  }
});

// #### first version ####

// app.get('/api/books/ID_:id', (req, res) => {
//   const book = books.find(b => b.id === parseInt(req.params.id));
//   if (!book) res.status(404).send('The ebook was not found');
//   res.send(book);
// });

// app.get('/api/books/TITLE_:title', (req, res) => {
//   const book = books.find(c => c.title === (req.params.title));
//   if (!book) res.status(404).send('The ebook was not found');
//   res.send(book);
// });

// app.get('/api/books/YEAR_:year', (req, res) => {
//   const book = books.find(b => b.year === parseInt(req.params.year));
//   if (!book) res.status(404).send('The ebook was not found');
//   res.send(book);
// });

// app.get('/api/books/AUTHOR_:author', (req, res) => {
//   const book = books.find(c => c.author === (req.params.author));
//   if (!book) res.status(404).send('The ebook was not found');
//   res.send(book);
// });

// app.get('/api/books/GENRE_:genre', (req, res) => {
//   const book = books.find(c => c.genre === (req.params.genre));
//   if (!book) res.status(404).send('The ebook was not found');
//   res.send(book);
// });
