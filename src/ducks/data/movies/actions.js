import { FETCH_MOVIE, FETCH_MOVIES, FETCH_SEANCES } from './action-types';

const fetchMoviesRequest = date => ({
  type: FETCH_MOVIES.REQUEST,
  date,
});

const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES.SUCCESS,
  movies,
});

const fetchMoviesError = error => ({
  type: FETCH_MOVIES.ERROR,
  error,
});

const fetchMovieRequest = id => ({
  type: FETCH_MOVIE.REQUEST,
  id,
});

const fetchMovieSuccess = movie => ({
  type: FETCH_MOVIE.SUCCESS,
  movie,
});

const fetchMovieError = error => ({
  type: FETCH_MOVIE.ERROR,
  error,
});

const fetchSeancesRequest = (movieId, date) => ({
  type: FETCH_SEANCES.REQUEST,
  movieId,
  date,
});

const fetchSeancesSuccess = seances => ({
  type: FETCH_SEANCES.SUCCESS,
  seances,
});

const fetchSeancesError = error => ({
  type: FETCH_SEANCES.ERROR,
  error,
});

export {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesError,
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieError,
  fetchSeancesRequest,
  fetchSeancesSuccess,
  fetchSeancesError,
};
