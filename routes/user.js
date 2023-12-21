const usersRouter = require('express').Router();

const { getCurrentUser, updateCurrentUser } = require('../controllers/user');
const { validateId, validateUpdateCurrentUser } = require('../middlewares/validator');

usersRouter.get('/me', getCurrentUser, validateId);
usersRouter.patch('/me', updateCurrentUser, validateUpdateCurrentUser);

module.exports = usersRouter;
