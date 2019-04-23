import { FETCH_MOVIES } from './action-types';

const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES.REQUEST,
});

const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES.SUCCESS,
  movies,
});

const fetchMoviesError = error => ({
  type: FETCH_MOVIES.ERROR,
  error,
});

export { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesError };
