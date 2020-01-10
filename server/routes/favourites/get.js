const express = require('express');
const router = express.Router();

const { User } = require('../../models/User');
const { Book } = require('../../models/Book');

router.get('/api/favourites/', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User Not Found!');

    const books = await Book.find({ _id: { $in: user.favorites } }).lean();
    for (let book of books) {
      if (book.bookCover) book.imgURL = `/uploads/${book.bookCover}`;
    }
    res.json(books);
  } catch (ex) {
    console.log(ex);
    res.json({
      error: ex.toString(),
    });
  }
});

module.exports = router;
