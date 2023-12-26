const errorRouter = require('express').Router();
const NotFound = require('../utils/errors/NotFound');

errorRouter.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = errorRouter;
