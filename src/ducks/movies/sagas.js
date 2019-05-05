import { all, call, takeLatest, put } from 'redux-saga/effects';

import { fetchMoviesError, fetchMoviesSuccess } from './actions';
import { FETCH_MOVIES } from './action-types';
import * as services from './services';

function* fetchMovies({ date }) {
  try {
    const movies = yield call(services.fetchMovies, date);
    yield put(fetchMoviesSuccess(movies));
  } catch (e) {
    yield put(fetchMoviesError(e));
  }
}

export function* watchMoviesRequests() {
  yield all([takeLatest(FETCH_MOVIES.REQUEST, fetchMovies)]);
}
