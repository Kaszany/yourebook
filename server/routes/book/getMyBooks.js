const router = require('express').Router();
const { Book } = require('../../models/Book');

router.get('/my', async (req, res) => {
  const { _id: userID } = req.user;
  try {
    const books = await Book.find({ owner: userID });

    res.json(books);
  } catch (ex) {
    console.error(ex);
    res.status(503).json(ex);
  }
});

module.exports = router;
