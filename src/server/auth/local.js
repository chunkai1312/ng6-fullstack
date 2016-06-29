'use strict';

const wrap = require('co-express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../api/models/user');

module.exports = {
  signup: wrap(function* (req, res) {
    const user = new User(req.body);
    user.provider = 'local';
    user.role = 'user';
    yield user.save();
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, config.jwt.options);
    res.json({ token });
  }),

  login: [
    passport.authenticate('local'),
    wrap(function* (req, res) {
      const user = req.user;
      const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, config.jwt.options);
      res.json({ token });
    }),
  ],
};

// module.exports = {
//   signup: wrap(signup),
//   login: wrap(login),
//   logout: wrap(logout),
//   forgotPassword: wrap(forgotPassword),
//   resetPassword: wrap(resetPassword),
// };

// function* signup(req, res, next) {
//   try {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;

//     if (!firstName || !lastName || !email || !username || !password) throw error(400);

//     const invitation = yield Invitation.getByEmail(req.body.email);
//     if (!invitation.verify(req.body.code)) throw error(400);

//     const params = { firstName, lastName, email, username, password };
//     const response = yield punwave.signup(params);

//     const user = yield User.create({
//       _id: response.id,
//       firstName: response.firstName,
//       lastName: response.lastName,
//       email: response.email,
//       businesses: [invitation.business],
//       roles: invitation.roles,
//     });
//     const result = yield punwave.login(username, password);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// }

// function* login(req, res, next) {
//   try {
//     let username = req.body.username;
//     let password = req.body.password;
//     if (!username || !password) throw error(400);
//     let response = yield punwave.login(username, password);
//     res.status(200).json(response);
//   } catch (err) {
//     next(err);
//   }
// }

// function* logout(req, res, next) {
//   console.log(config.punwave.auth);
//   const url = querystring.escape(`${config.oauth.punwave.authorizationURL}?response_type=code&client_id=${config.oauth.punwave.clientID}&redirect_uri=${config.oauth.punwave.callbackURL}`);
//   res.redirect(`${config.punwave.auth}/logout?continue=${url}`);
// }

// function* forgotPassword(req, res, next) {
//   try {
//     let user = yield User.getByEmail(req.body.email);
//     if (!user) throw error(404);

//     let passwordReset = yield PasswordReset.getByEmail(req.body.email);
//     if (!passwordReset) passwordReset = new PasswordReset();
//     passwordReset.user = user.id;
//     passwordReset.code = base64url(crypto.randomBytes(32)); // generate code

//     let response = yield punwave.forgotPassword(user.email, user.name, passwordReset.url);
//     if (response.message !== 'success') throw error(500);

//     yield passwordReset.save();
//     res.status(200).json({ message: 'success' });
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// }

// function* resetPassword(req, res, next) {
//   try {
//     let passwordReset = yield PasswordReset.getByCode(req.body.code);
//     if (!passwordReset) throw error(404);

//     let response = yield punwave.resetPassword(passwordReset.user, req.body.password);
//     if (response.message !== 'success') throw error(500);

//     passwordReset.activate = true;
//     yield passwordReset.save();
//     res.status(200).json({ message: 'success' });
//   } catch (err) {
//     next(err);
//   }
// }
