'use strict'; /* eslint new-cap: 0 */

const express = require('express');
const router = express.Router();
const user = require('./controllers/user');
const thing = require('./controllers/thing');
const auth = require('./middlewares/auth');

router.use(auth.isAuthenticated());

router.get('/users', user.index);
router.get('/users/me', user.me);
router.post('/users', user.create);
router.get('/users/:id', user.show);
router.put('/users/:id', user.update);
router.delete('/users/:id', user.destroy);
router.put('/users/:id/password', user.changePassword);

router.get('/things', thing.index);
router.post('/things', thing.create);
router.get('/things/:id', thing.show);
router.put('/things/:id', thing.update);
router.delete('/things/:id', thing.destroy);

module.exports = router;
