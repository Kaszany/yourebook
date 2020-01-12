const router = require('express').Router();

const getBooks = require('./getBook');
const getMyBooks = require('./getMyBooks');
const postBooks = require('./postBook');
const putBooks = require('./putBook');
const deleteBooks = require('./deleteBook');

router.use(getBooks);
router.use(getMyBooks);
router.use(postBooks);
router.use(putBooks);
router.use(deleteBooks);
module.exports = router;
