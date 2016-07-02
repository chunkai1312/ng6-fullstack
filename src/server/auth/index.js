'use strict'; /* eslint new-cap: 0 */

const express = require('express');
const router = express.Router();
const local = require('./local');
const google = require('./google');
const facebook = require('./facebook');

router.post('/signup', local.signup);
router.post('/login', local.login);
router.get('/google', google.index);
router.get('/google/callback', google.callback);
router.get('/facebook', facebook.index);
router.get('/facebook/callback', facebook.callback);

module.exports = router;
