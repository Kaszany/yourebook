const express = require('express');
const router = express.Router();
const { Book } = require('../../models/Book');
const auth = require('../../middleware/auth');


router.put('/api/books/:id', function(req, res,){
    
    Book.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then (function(){
    Book.findOne({_id: req.params.id})
    .then (function(books){
    res.json(books);
    });
})
})

module.exports = router;