'use strict';  /* eslint consistent-return: 0 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const credential = require('credential');
const pw = credential();

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  provider: { type: String, enum: ['local', 'google', 'facebook'] },
  google: {},
  facebook: {},
}, { collection: 'users', timestamps: true, virtuals: true });

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

UserSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
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
   * Get a user by id.
   *
   * @param  {String}   id - id for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  getById(id, callback) {
    return this.findById(id, callback);
  },

  /**
   * Get a user by email.
   *
   * @param  {String}   email - email address for querying
   * @param  {Function} callback - callback function for when query is complete
   * @return {Promise}  result of query
   */
  getByEmail(email, callback) {
    return this.findOne({ email }, callback);
  },
};

UserSchema.methods = {

  /**
   * Authenticate a user.
   *
   * @param  {String}   password - password of the user
   * @param  {Function} callback - callback function for when authentication is complete
   * @return {Promise}  return true or false if without error
   */
  authenticate(password, callback) {
    return pw.verify(this.password, password, callback);
  },

  /**
   * Change password of the user
   *
   * @param  {String}   oldPassword - current password of the user
   * @param  {String}   newPassword - new password of the user
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

module.exports = mongoose.model('OAuthUser', UserSchema);
