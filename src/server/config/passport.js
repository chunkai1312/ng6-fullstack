'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const co = require('co');
const User = require('../api/models/user');
const config = require('../config');

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

const google = new GoogleStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret,
  callbackURL: config.oauth.google.callbackURL,
}, (accessToken, refreshToken, profile, done) => {
  co(function* () {
    let user = yield User.getByGoogle(profile.id);
    if (!user) {
      user = yield User.getByEmail(profile.emails[0].value);
      if (user) return done(null, false, { message: 'There is already an account using this email address.' });
      user = yield User.create({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        google: profile.id,
      });
    }
    return done(null, user);
  }).catch(err => done(err));
});

const facebook = new FacebookStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret,
  callbackURL: config.oauth.facebook.callbackURL,
  profileFields: ['id', 'email', 'first_name', 'last_name'],
}, (accessToken, refreshToken, profile, done) => {
  co(function* () {
    let user = yield User.getByFacebook(profile.id);
    if (!user) {
      user = yield User.getByEmail(profile.emails[0].value);
      if (user) return done(null, false, { message: 'There is already an account using this email address.' });
      user = yield User.create({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        facebook: profile.id,
      });
    }
    return done(null, user);
  }).catch(err => done(err));
});

module.exports = function () {
  passport.use(local);
  passport.use(google);
  passport.use(facebook);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
