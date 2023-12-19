/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017//bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
