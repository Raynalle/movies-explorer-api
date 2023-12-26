const usersRouter = require('express').Router();

const { getCurrentUser, updateCurrentUser } = require('../controllers/user');
const { validateUpdateCurrentUser } = require('../middlewares/validator');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateCurrentUser, validateUpdateCurrentUser);

module.exports = usersRouter;
