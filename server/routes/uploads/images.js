const router = require('express').Router();

router.get('/uploads/:id', async (req, res) => {
  const { gfs } = res.locals;

  gfs.findOne({ _id: req.params.id }, (err, file) => {
    if (err) {
      res.status(503).json({
        error: 'Internal server error',
      });
      return;
    }
    if (!file) {
      res.status(404).json({
        error: 'File is missing',
      });
      return;
    }
    if (!(file.contentType === 'image/jpeg' || file.contentType === 'image/png')) {
      res.status(404).json({
        error: 'Requested assets is not image',
      });
      return;
    }

    const readstream = gfs.createReadStream({ _id: req.params.id });
    readstream.pipe(res);
  });
});

module.exports = router;
