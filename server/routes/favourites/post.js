const express = require('express');
const router = express.Router();

const { User } = require('../../models/User');

router.post('/api/favourites/', async (req, res) => {
  const { id, email } = req.query;
  console.log(email, id);
  try {
    const user = await User.findOneAndUpdate({ email }, { $addToSet: { favorites: id } });
    if (!user) throw new Error('User Not Found!');

    res.json({ id });
  } catch (ex) {
    console.log(ex);
    res.json({
      error: ex.toString(),
    });
  }
});

module.exports = router;
