const PORT_NUMDER = 3000;
const ADDRESS_DB = process.env.DB_ADDRESS;

const INVALID_DATA = 'Переданы некорректные данные';

const NOT_FOUND_FILM = 'Фильм с таким id не найден';
const FORBIDDEN_DELETE_FILM = 'Вы не можете удалять фильмы других пользователей';

const NOT_FOUND_USER = 'Пользователь не найден';
const USER_CONFLECT = 'Пользователь с таким email уже существует';
const VALIDATION_ERROR_MESSAGE = 'Ошибка валидации';

const VALIDATION_ERROR = 'ValidationError';

const NEED_AUTHORIZATION = 'Необходимо авторизироваться';
const DUPLICATE_ERROR = 11000;

const FORMAT_EMAIL = 'адрес электронной почты должен содержать @';
const ERROR_PASSWORD_OR_EMAIL = 'Неправильные почта или пароль';
const CRASH_TEST_MESSAGE = 'Сервер сейчас упадёт';

module.exports = {
  PORT_NUMDER,
  ADDRESS_DB,
  INVALID_DATA,
  NOT_FOUND_FILM,
  FORBIDDEN_DELETE_FILM,
  NOT_FOUND_USER,
  USER_CONFLECT,
  VALIDATION_ERROR_MESSAGE,
  NEED_AUTHORIZATION,
  VALIDATION_ERROR,
  DUPLICATE_ERROR,
  FORMAT_EMAIL,
  ERROR_PASSWORD_OR_EMAIL,
  CRASH_TEST_MESSAGE,
};
