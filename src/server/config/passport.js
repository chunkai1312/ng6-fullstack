'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const co = require('co');
const User = require('../api/models/user');

const local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, (email, password, done) => {
  co(function* () {
    const user = yield User.getByEmail(email);
    if (!user) return done(null, false, { message: 'This email is not registered.' });
    const isAuthenticated = yield user.authenticate(password);
    if (!isAuthenticated) return done(null, false, { message: 'This password is not correct.' });
    return done(null, user);
  }).catch(err => done(err));
});

module.exports = function () {
  passport.use(local);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
