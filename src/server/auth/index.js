'use strict'; /* eslint new-cap: 0 */

const express = require('express');
const router = express.Router();
const local = require('./local');
const facebook = require('./facebook');

router.post('/signup', local.signup);
router.post('/login', local.login);
router.get('/facebook', facebook.index);
router.get('/facebook/callback', facebook.callback);

module.exports = router;
