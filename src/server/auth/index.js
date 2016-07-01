'use strict'; /* eslint new-cap: 0 */

const express = require('express');
const router = express.Router();
const local = require('./local');

router.post('/signup', local.signup);
router.post('/login', local.login);

module.exports = router;
