const router = require('express').Router();

const { Book } = require('../../models/Book');
const Joi = require('joi');

// funkcja która stworzy filtr do mongo
function SearchCriteria(criterias) {
  // polecam zapamiętać tą pętle pod spodem, bardzo elegancki sposób na przejscie po obiekcie, zarówno po kluczach jak i wartościach
  for (let [key, value] of Object.entries(criterias)) {
    //   sprawdzam czy dana wartość istnieje, jeżeli jest pustym stringiem to zostanie pominięta (ponieważ w js '' jest wartością falsy)
    if (value) {
      //jeżeli wartość istnieje to dodaje ją do obiektu
      this[key] = value;
    }
  }
  //   zwracam obiekt
  return this;
}

router.get('/api/books', async (req, res) => {
  // Z parametrów zapytania wyciagam tylko legitne kryteria po których można wyszukiwać
  const { title, year, author, genre } = req.query;

  // Tworzę nowy obiekt który będzie służył jako filtr do mongo
  const searchCriteria = new SearchCriteria({ title, year, author, genre });

  //   bardzo podstawowa obsluga blędów
  try {
    //   próbuje znaleźć ksiązki w bazie
    const books = await Book.find(searchCriteria);
  
  //###################################################################  
  // walidacja Joi - można wyszukiwać tylko roczniki 2014-2017  
  const schema = Joi.number().min(2014).max(2017);
  Joi.assert(year, schema);

  const schemaTitle = Joi.string().min(5);
  Joi.assert(title, schemaTitle);
  //###################################################################


    // jeśli poszukiwanie się uda zwraca json, uwaga brak książek (pusta tablica) to też jest sukces
    res.json(books);
  } catch (ex) {
    //   Loguje exception do konsoli, na produkcje słaby pomysł ale do testów może się przydać
    console.error(ex);

    // a tą linie wziąłem od Radka bo ładna była
    res.status(400).json({ message: ex.message });
  }
  //   console.log('TCL: books', books);
});

module.exports = router;

// const books = [
//   { id: 1, title: '50 shades of grey', author: 'E. L. James', genre: 'romance', year: 2011 },
//   { id: 2, title: 'Games of thrones', author: 'George R. R. Martin', genre: 'fantasy', year: 2011 },
//   { id: 3, title: 'Dying of the Light', author: 'George R. R. Martin', genre: 'fantasy', year: 1977 },
//   { id: 4, title: 'Dracula', author: 'Bram Stoker', genre: 'gothic novel', year: 1897 },
//   { id: 5, title: 'Dracula', author: 'Bram Stoker', genre: 'gothic novel', year: 1897 },
//   { id: 6, title: 'Dracula', author: 'Bram Stoker', genre: 'gothic novel', year: 1897 },
//  ];

// app.get('/api/books/ID_:id', (req, res) => {
//   var book = [];
//   for (var i = 0; i < books.length; i++) {
//     if (books[i].id === parseInt(req.params.id)) {
//       book.push(books[i]);
//     }
//   }
//   if (book.length > 0) {
//     res.send(book);
//   } else {
//     res.status(404).send('The ebook was not found');
//   }
// });

// app.get('/api/books/TITLE_:title', (req, res) => {
//   var book = [];
//   for (var i = 0; i < books.length; i++) {
//     if (books[i].title === req.params.title) {
//       book.push(books[i]);
//     }
//   }
//   if (book.length > 0) {
//     res.send(book);
//   } else {
//     res.status(404).send('The ebook was not found');
//   }
// });

// app.get('/api/books/YEAR_:year', (req, res) => {
//   var book = [];
//   for (var i = 0; i < books.length; i++) {
//     if (books[i].year === parseInt(req.params.year)) {
//       book.push(books[i]);
//     }
//   }
//   if (book.length > 0) {
//     res.send(book);
//   } else {
//     res.status(404).send('The ebook was not found');
//   }
// });

// app.get('/api/books/AUTHOR_:author', (req, res) => {
//   var book = [];
//   for (var i = 0; i < books.length; i++) {
//     if (books[i].author === req.params.author) {
//       book.push(books[i]);
//     }
//   }
//   if (book.length > 0) {
//     res.send(book);
//   } else {
//     res.status(404).send('The ebook was not found');
//   }
// });

// app.get('/api/books/GENRE_:genre', (req, res) => {
//   var book = [];
//   for (var i = 0; i < books.length; i++) {
//     if (books[i].genre === req.params.genre) {
//       book.push(books[i]);
//     }
//   }
//   if (book.length > 0) {
//     res.send(book);
//   } else {
//     res.status(404).send('The ebook was not found');
//   }
// });
