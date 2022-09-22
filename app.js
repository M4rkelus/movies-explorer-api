require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://movies-explorer-mrk.nomorepartiesxyz.ru',
    'http://api.movies-explorer-mrk.nomorepartiesxyz.ru',
    'https://movies-explorer-mrk.nomorepartiesxyz.ru',
    'https://api.movies-explorer-mrk.nomorepartiesxyz.ru',
  ],
  credentials: true,
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
