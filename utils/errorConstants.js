/* Error codes */
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;

/* Error text messages */
// Movie error texts
const ACCESS_ERROR_TEXT = 'Нельзя удалять чужие фильмы.';
const INVALID_MOVIE_DATA_ERROR_TEXT = 'Переданы некорректные данные в метод создания фильма.';
const INVALID_MOVIE_DATA_DELETE_ERROR_TEXT = 'Переданы некорректные данные в метод удаления фильма.';
const MOVIE_ID_NOT_FOUND_ERROR_TEXT = 'Фильм с указанным id не найден.';

// User error texts
const DUPLICATE_EMAIL_ERROR_TEXT = 'Пользователь с таким email уже существует.';
const INVALID_USER_DATA_ERROR_TEXT = 'Переданы некорректные данные в метод создания пользователя.';
const INVALID_PROFILE_DATA_ERROR_TEXT = 'Переданы некорректные данные в метод обновления пользователя.';
const USER_ID_NOT_FOUND_ERROR_TEXT = 'Пользователь c указанным id не найден.';

// Other error texts
const INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT = 'Неверный электронный адрес или пароль.';
const INVALID_EMAIL_FORMAT_ERROR_TEXT = 'Некорректный формат электронной почты.';
const INVALID_URL_FORMAT_ERROR_TEXT = 'Некорректный формат ссылки.';
const SERVER_ERROR_TEXT = 'Внутренняя ошибка сервера.';
const UNAUTHORIZED_ERROR_TEXT = 'Необходима авторизация.';
const URL_NOT_FOUND_ERROR_TEXT = 'Запрашиваемый ресурс не найден, проверьте адрес:';
const MAX_LIMIT_RATE_ERROR_TEXT = 'Превышено ограничение количества запросов, попробуйте снова позже.';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
  ACCESS_ERROR_TEXT,
  INVALID_MOVIE_DATA_ERROR_TEXT,
  INVALID_MOVIE_DATA_DELETE_ERROR_TEXT,
  MOVIE_ID_NOT_FOUND_ERROR_TEXT,
  DUPLICATE_EMAIL_ERROR_TEXT,
  INVALID_USER_DATA_ERROR_TEXT,
  INVALID_PROFILE_DATA_ERROR_TEXT,
  USER_ID_NOT_FOUND_ERROR_TEXT,
  INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT,
  INVALID_EMAIL_FORMAT_ERROR_TEXT,
  INVALID_URL_FORMAT_ERROR_TEXT,
  UNAUTHORIZED_ERROR_TEXT,
  SERVER_ERROR_TEXT,
  URL_NOT_FOUND_ERROR_TEXT,
  MAX_LIMIT_RATE_ERROR_TEXT,
};
