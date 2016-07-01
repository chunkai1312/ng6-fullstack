'use strict';

const expressJwt = require('express-jwt');
const config = require('../../config');

module.exports = {

  /**
   * Attaches the user object to the request if authenticated
   * Otherwise returns 403
   */
  isAuthenticated() {
    return [
      function (res, req, next) {
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = `Bearer ${req.query.access_token}`;
        }
        next();
      },
      expressJwt({ secret: config.jwt.secret }),
    ];
  },
};
