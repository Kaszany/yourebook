require('dotenv').config();

const router = require('express').Router();
const { Book } = require('../../models/Book');
const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(process.env.DATABASE_URL);
conn.once('open', function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('PDFs');
});

router.get('/api/PDFs.files', async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404);
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
        return res.status(404).send('Error on the database looking for the file.');
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
// router.get('/api/PDFs.files/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       if (!file || file.length === 0) {
//         return res.status(404).json({
//           err: 'No file like this',
//         });
//       }
//       return res.json(file);
//     });
//   });


module.exports = router;
