import {
  all,
  call,
  takeLatest,
  put,
} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm';

import {
  fetchMovieError,
  fetchMoviesError,
  fetchMoviesSuccess,
  fetchMovieSuccess,
  fetchSeancesError,
  fetchSeancesSuccess,
} from './actions';

import { FETCH_MOVIE, FETCH_MOVIES, FETCH_SEANCES } from './action-types';
import * as services from './services';

function* fetchMovies({ date }) {
  try {
    const movies = yield call(services.fetchMovies, date);
    yield put(fetchMoviesSuccess(movies));
  } catch (e) {
    yield put(fetchMoviesError(e));
  }
}

function* fetchMovie({ id }) {
  try {
    const movie = yield call(services.fetchMovie, id);
    yield put(fetchMovieSuccess(movie));
  } catch (e) {
    yield put(fetchMovieError(e));
  }
}

function* fetchSeances({ movieId, date }) {
  try {
    const seances = yield call(services.fetchSeances, movieId, date);
    yield put(fetchSeancesSuccess(seances));
  } catch (e) {
    yield put(fetchSeancesError(e));
  }
}

export function* watchMoviesRequests() {
  yield all([
    takeLatest(FETCH_MOVIES.REQUEST, fetchMovies),
    takeLatest(FETCH_MOVIE.REQUEST, fetchMovie),
    takeLatest(FETCH_SEANCES.REQUEST, fetchSeances),
  ]);
}
