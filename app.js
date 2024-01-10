/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes/index');
const { PORT_NUMDER, ADDRESS_DB } = require('./utils/constants/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./utils/rateLimiter');
const handleErrors = require('./middlewares/handleErrors');
const CRASH_TEST_MESSAGE = require('./utils/constants/constants');

const { PORT = PORT_NUMDER } = process.env;

const app = express();

mongoose.connect(ADDRESS_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(rateLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger);
app.use(helmet());

app.use('/', router);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_TEST_MESSAGE);
  }, 0);
});

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
