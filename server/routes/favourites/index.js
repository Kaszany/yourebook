const router = require('express').Router();

const get = require('./get');
const post = require('./post');

router.use(get);
router.use(post);

module.exports = router;
