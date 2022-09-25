const {
  NODE_ENV,
  JWT_SECRET,
  DATABASE,
  PORT = 3000,
} = process.env;

const DEV_DATABASE = 'mongodb://localhost:27017/moviesdb';
const DEV_JWT_SECRET = 'dev-secret';

const CORS_OPTIONS = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://mesto-frontend-mp.nomoredomains.sbs',
    'http://mesto-backtend-mp.nomoredomains.sbs',
    'https://mesto-frontend-mp.nomoredomains.sbs',
    'https://mesto-backtend-mp.nomoredomains.sbs',
  ],
  credentials: true,
};

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  DATABASE,
  PORT,
  DEV_DATABASE,
  DEV_JWT_SECRET,
  CORS_OPTIONS,
};
