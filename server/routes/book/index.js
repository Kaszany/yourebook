const router = require('express').Router();

const getBooks = require('./getBook');
const postBooks = require('./postBook');
const putBooks = require('./putBook');
const deleteBooks = require('./deleteBook');
const downloadPDF = require('./downloadPDF');

router.use(downloadPDF);
router.use(getBooks);
router.use(postBooks);
router.use(putBooks);
router.use(deleteBooks);
module.exports = router;
