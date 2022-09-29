require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  NODE_ENV,
  DATABASE,
  PORT,
  DEV_DATABASE,
  CORS_OPTIONS,
} = require('./utils/configConstants');

const app = express();

app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DATABASE : DEV_DATABASE);

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT} порту`);
});
