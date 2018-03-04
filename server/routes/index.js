const { Router } = require('express');

const router = new Router();
module.exports = router;

router.post('/api', require('./api'));
