const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  INVALID_EMAIL_FORMAT_ERROR_TEXT,
  INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT,
} = require('../utils/errorConstants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: INVALID_EMAIL_FORMAT_ERROR_TEXT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function passwordHashHandler(
  email,
  password,
) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT);
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT);
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
