const Router = require('express').Router();

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const { validateSignIn, validateSignUp } = require('../middlewares/validator');

const moviesRouter = require('./movie');
const usersRouter = require('./user');
const errorRouter = require('./errorrouter');

Router.post('/signup', validateSignUp, createUser);
Router.post('/signin', validateSignIn, login);

Router.use('/users', auth, usersRouter);
Router.use('/movies', auth, moviesRouter);
Router.use('*', errorRouter);

module.exports = Router;
