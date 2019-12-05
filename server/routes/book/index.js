const router = require('express').Router();

const getBooks = require('./getBook');
const postBooks = require('./postBook');

router.use(getBooks);
router.use(postBooks);

module.exports = router;
