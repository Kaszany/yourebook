const express = require('express');
const router = express.Router();

const { User } = require('../../models/User');
const { Book } = require('../../models/Book');

router.get('/', async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  try {
    const user = await User.findOne({ _id });
    if (!user) throw new Error('User Not Found!');

    const books = await Book.find({ _id: { $in: user.favorites } });

    res.json(books);
  } catch (ex) {
    console.log(ex);
    res.json({
      error: ex.toString(),
    });
  }
});

module.exports = router;
