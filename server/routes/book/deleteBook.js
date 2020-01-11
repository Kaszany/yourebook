const express = require('express');
const router = express.Router();
const { Book } = require('../../models/Book');

router.delete('/:id', async function(req, res) {
  try {
    const { _id: userID } = req.user;

    const book = await Book.findById(req.params.id);
    if (book.owner.toString() !== userID) throw new Error(`You don't have permissions to delete this book`);

    await Book.findByIdAndRemove({ _id: req.params.id });
    res.json(book);
  } catch (ex) {
    console.log(ex);
    res.status(403).json({ error: ex.toString() });
  }
});

module.exports = router;
