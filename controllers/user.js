const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../utils/errors/NotFound');
const BadRequest = require('../utils/errors/BadRequest');
const Conflict = require('../utils/errors/Conflict');
const {
  NOT_FOUND_USER,
  USER_CONFLECT,
  VALIDATION_ERROR_MESSAGE,
  INVALID_DATA, VALIDATION_ERROR,
  DUPLICATE_ERROR,
} = require('../utils/constants/constants');

const getCurrentUser = (req, res, next) => {
  const _id = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFound(NOT_FOUND_USER);
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;

  if (name === undefined && email === undefined) {
    next(new BadRequest(INVALID_DATA));
    return;
  }

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(NOT_FOUND_USER);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(INVALID_DATA));
        return;
      }
      if (err.code === DUPLICATE_ERROR) {
        next(new Conflict(USER_CONFLECT));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(VALIDATION_ERROR_MESSAGE));
      } else if (err.code === DUPLICATE_ERROR) {
        next(new Conflict(USER_CONFLECT));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  login,
  createUser,
};
