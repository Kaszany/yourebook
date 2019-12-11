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

router.get('/api/books', async (req, res) => {
  const { title, year, author, genre } = req.query;
  const searchCriteria = new SearchCriteria({ title, year, author, genre });
  
   try {

  const schema = Joi.number().min(0);
  Joi.validate(year, schema, (err) => {
    if (err) {
      res.status(422).send('The year cannot be earlier than 0');
    } 
  });
  

   const schemaTitle = Joi.string().min(2);
   Joi.validate(title, schemaTitle, (err) => {
    if (err) {
      res.status(422).send('Title should have at least 2 characters');
    } 
  });
 


  // const schema = Joi.object({
  //   title: Joi.string().min(2),
  //   year: Joi.number().min(0),
  //   author: Joi.string(),
  //   genre: Joi.string()
  // });

  //  Joi.validate(req.body, schema);
   
    
   
  
  const books = await Book.find(searchCriteria);
  res.json(books);

  } catch (ex) {
    console.error(ex);
    res.status(400).json({ message: ex.message });
  }
  
});

module.exports = router;