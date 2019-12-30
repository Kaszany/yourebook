require('dotenv').config();

const router = require('express').Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.DATABASE_URL);
conn.once('open', function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('PDFs');
});

router.get('/api/PDFs.files', async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).send('No files');
    }
    return res.json(files);
  });
});

router.get('/api/PDFs.files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (err) {
        return res.status(400).send(err);
    }
    else if (!file) {
        return res.status(404).send('File doesnt exist');
    }
    
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

    var readstream = gfs.createReadStream({
      filename: req.params.filename,
    });

    readstream.on("error", function(err) { 
        res.end();
    });
    readstream.pipe(res);
    
  });
  
});


module.exports = router;
