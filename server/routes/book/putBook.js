const express = require('express');
const router = express.Router();
const { Book } = require('../../models/Book');

router.put('/:id', async function(req, res) {
  try {
    const { _id: userID } = req.user;

    const book = await Book.findById(req.params.id);
    console.log('TCL: userID', userID);
    console.log('TCL: book.owner', book.owner);
    if (book.owner.toString() !== userID) throw new Error(`You don't have permissions to delete this book`);

    Book.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
      Book.findOne({ _id: req.params.id }).then(function(books) {
        res.json(books);
      });
    });
  } catch (ex) {
    console.error(ex);
    res.status(403).json({ error: ex.toString() });
  }
});

module.exports = router;
