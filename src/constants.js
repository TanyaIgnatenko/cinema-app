import { MINUTES_IN_HOUR } from './utils/time';

const ROUTE = {
  MOVIES: '/movies-page',
  MOVIE: '/movie-page/:id',
  SOON_MOVIES: '/soon-movies-page',
  BEST_DEALS: '/best-deals',
};

const APP_DATE_FORMAT = 'YYYY-MM-DD';

const SEANCES_TIME_RANGE = {
  start: 10 * MINUTES_IN_HOUR,
  end: 26 * MINUTES_IN_HOUR,
};

export { ROUTE, APP_DATE_FORMAT, SEANCES_TIME_RANGE };
