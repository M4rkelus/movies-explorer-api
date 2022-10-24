const {
  NODE_ENV,
  JWT_SECRET,
  DATABASE,
  PORT = 3000,
} = process.env;

const DEV_DATABASE = 'mongodb://localhost:27017/moviesdb';
const DEV_JWT_SECRET = 'dev-secret';

const CORS_OPTIONS = {
  origin: allowedCors,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
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
