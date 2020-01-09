const router = require('express').Router();

router.get('/api/PDFs.files/:id', (req, res) => {
  const { gfs } = res.locals;

  gfs.findOne({ _id: req.params.id }, (err, file) => {
    var decodedString = String.fromCharCode.apply(null, new Uint8Array(res));
    if (err) {
      res.status(503).send('Internal server error');
      return;
    }
    if (!file) {
      res.status(404).send('No file attached');
      return;
    }
    if (!(file.contentType === 'application/pdf')) {
      res.status(404).send('Requested asset is not and PDF');
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
