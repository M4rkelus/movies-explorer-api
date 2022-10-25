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
    'http://api.nomoreparties.co',
    'https://api.nomoreparties.co',
    'http://movies-explorer-mrk.nomorepartiesxyz.ru',
    'https://movies-explorer-mrk.nomorepartiesxyz.ru',
    'http://api.movies-explorer-mrk.nomorepartiesxyz.ru',
    'https://api.movies-explorer-mrk.nomorepartiesxyz.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
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
