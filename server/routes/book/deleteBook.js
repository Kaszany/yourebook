const express = require('express');
const router = express.Router();
const { Book } = require('../../models/Book');

router.delete('/:id', function(req, res) {
  Book.findByIdAndRemove({ _id: req.params.id }, req.body).then(function(books) {
    res.json(books);
  });
});

module.exports = router;
