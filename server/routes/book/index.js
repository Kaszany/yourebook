const express = require('express');
const router = express.Router();

const getBooks = require('./getBook');
const postBooks = require('./postBook');

router.use(getBooks);
router.use(postBooks);

module.exports = router;
