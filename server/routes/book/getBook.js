const router = require('express').Router();
const { Book } = require('../../models/Book');
const Joi = require('joi');

function SearchCriteria(criterias) {
  for (let [key, value] of Object.entries(criterias)) {
    if (value) {
      this[key] = value;
    }
  }
  return this;
}

router.get('/', async (req, res) => {
  const { title, year, author, genre } = req.query;
  const searchCriteria = new SearchCriteria({ title, year, author, genre });

  try {
    const schema = Joi.object().keys({
      title: Joi.string()
        .allow('')
        .min(2),
      year: Joi.number()
        .allow('')
        .min(0),
      author: Joi.string().allow(''),
      genre: Joi.string().allow(''),
    });

    Joi.validate(req.query, schema, err => {
      if (err) {
        console.log(err);
        res.status(422).send('You entered the wrong search parameter value');
      }
    });

    const books = await Book.find(searchCriteria);
    console.log('TCL: books', books);

    res.json(books);
  } catch (ex) {
    console.error(ex);
    res.status(400).send({ message: ex.message });
  }
});

module.exports = router;
