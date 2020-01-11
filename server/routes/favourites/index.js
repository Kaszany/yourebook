const router = require('express').Router();

const get = require('./get');
const post = require('./post');
const remove = require('./delete');

router.use(get);
router.use(post);
router.use(remove);

module.exports = router;
