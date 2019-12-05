const router = require('express').Router();

router.get('/api/books', (req, res) => {
  console.log('Dziala');
  res.sendStatus(200);
});

module.exports = router;
