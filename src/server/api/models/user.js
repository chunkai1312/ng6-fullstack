'use strict';  /* eslint consistent-return: 0, no-unused-vars: 0 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const credential = require('credential');
const pw = credential();

const UserSchema = new Schema({
  email: { type: String, lowercase: true },
  password: { type: String },
  role: { type: String, default: 'user', enum: ['admin', 'user'] },
  provider: { type: String, default: 'local', enum: ['local', 'google', 'facebook'] },
  google: { type: String },
  facebook: { type: String },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
  },
}, { collection: 'users', timestamps: true, virtuals: true });

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

UserSchema.virtual('profile.name').get(function () {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  pw.hash(this.password, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

UserSchema.statics = {

  /**
   * Get users.
   *
   * @param  {Object}   query - object for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  get(query, callback) {
    return this.find(query, '-password', callback);
  },

  /**
   * Get a user by id.
   *
   * @param  {string}   id - id for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  getById(id, callback) {
    return this.findOne({ _id: id }, '-password', callback);
  },

  /**
   * Get a user by email.
   *
   * @param  {string}   email - email address for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  getByEmail(email, callback) {
    return this.findOne({ email, provider: 'local' }, callback);
  },

  /**
   * Get a user by google plus id.
   *
   * @param  {string}   facebook - google plus id for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  getByGoogle(google, callback) {
    return this.findOne({ google }, callback);
  },

  /**
   * Get a user by facebook id.
   *
   * @param  {string}   facebook - facebook id for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  getByFacebook(facebook, callback) {
    return this.findOne({ facebook }, callback);
  },
};

UserSchema.methods = {

  /**
   * Authenticate a user.
   *
   * @param  {string}   password - password of the user
   * @param  {Function} callback - callback function for when authentication is complete
   * @return {Promise}  return true or false if without error
   */
  authenticate(password, callback) {
    return pw.verify(this.password, password, callback);
  },

  /**
   * Change password of the user
   *
   * @param  {string}   oldPassword - current password of the user
   * @param  {string}   newPassword - new password of the user
   * @param  {Function} callback - callback function for when processing is complete
   * @return {Promise}  return the user instance if changed password successfully,
   *                    or return false if oldPassword is invalid
   */
  changePassword(oldPassword, newPassword, callback) {
    callback = callback || function () { };
    return new Promise((resolve, reject) => {
      this.authenticate(oldPassword)
        .then(isAuthenticated => {
          if (!isAuthenticated) {
            resolve(false);
            return callback(null, false);
          }
          this.password = newPassword;
          this.save((err, user) => {
            if (err) {
              reject(err);
              return callback(err);
            }
            resolve(user);
            return callback(user);
          });
        })
        .catch((err) => {
          reject(err);
          return callback(err);
        });
    });
  },
};

module.exports = mongoose.model('User', UserSchema);
