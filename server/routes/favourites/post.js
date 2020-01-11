const express = require('express');
const router = express.Router();

const { User } = require('../../models/User');

router.post('/', async (req, res) => {
  const { id: bookID } = req.query;
  const { _id: userID } = req.user;
  console.log(userID, bookID);
  try {
    const user = await User.findOneAndUpdate({ _id: userID }, { $addToSet: { favorites: bookID } });
    if (!user) throw new Error('User Not Found!');

    res.json({ bookID });
  } catch (ex) {
    console.log(ex);
    res.status(400).json({
      error: ex.toString(),
    });
  }
});

module.exports = router;
