const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходимо авторизироваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new Unauthorized('Необходимо авторизироваться');
  }

  req.user = payload;

  next();
};
