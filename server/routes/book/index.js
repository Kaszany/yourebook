const router = require('express').Router();

const getBooks = require('./getBook');
const postBooks = require('./postBook');
const putBooks = require('./putBook');

router.use(getBooks);
router.use(postBooks);
router.use(putBooks);

module.exports = router;
