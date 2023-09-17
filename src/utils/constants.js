const MAIN_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://react-mesto-backend.nomoreparties.co'
  : 'http://localhost:3000';
export const mainApiConfig = {
  baseUrl: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

const MOVIES_API_URL = 'https://api.nomoreparties.co';

export const moviesApiConfig = {
  baseUrl: MOVIES_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const NAME_PATTERN = '[A-Za-zА-ЯЁа-яё\\s\\-]+';
export const EMAIL_PATTERN = '^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{1,63}$';

export const SHORT_MOVIE_DURATION = 40;

export const MOBILE_MAX_WIDTH = 768;
export const TABLET_MAX_WIDTH = 1024;

export const MOVIES_LIST_MOBILE = { start: 5, step: 2, count: 1 };
export const MOVIES_LIST_TABLET = { start: 4, step: 1, count: 2 };
export const MOVIES_LIST_DESKTOP = { start: 4, step: 1, count: 3 };
