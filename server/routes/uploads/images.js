const router = require('express').Router();

router.get('/uploads/:id', async (req, res) => {
  try {
    const readstream = res.locals.gfs.createReadStream({ _id: req.params.id });
    readstream.pipe(res);
  } catch (ex) {
    res.json({
      error: 'Ni ma obrazka',
    });
  }
});

module.exports = router;
