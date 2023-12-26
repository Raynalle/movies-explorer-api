/* eslint-disable func-names */
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const Unauthorized = require('../utils/errors/Unauthorized');
const { FormatEmail, ErrorPasswordOrEmail } = require('../utils/constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: FormatEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(ErrorPasswordOrEmail));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Unauthorized(ErrorPasswordOrEmail));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
