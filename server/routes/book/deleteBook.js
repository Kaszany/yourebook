const express = require('express');
const router = express.Router();
const { Book } = require('../../models/Book');





router.delete('/api/books/:id', function(req, res,){
    
    Book.findByIdAndRemove({_id: req.params.id}, req.body)
    .then (function(books){
    res.send('Delete book');    
    });
})

module.exports = router;