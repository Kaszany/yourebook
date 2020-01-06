const router = require('express').Router();

router.get('/api/PDFs.files/:id', (req, res) => {
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
    if (!(file.contentType === 'application/pdf')) {
      res.status(404).json({
        error: 'Requested assets is not image',
      });
      return;
    }

    const readstream = gfs.createReadStream({
      _id: req.params.id,
    });

    readstream.on('error', function(err) {
      res.end();
    });
    readstream.pipe(res);
  });
});

module.exports = router;
