import { all, call } from 'redux-saga/effects';
import { watchMoviesRequests } from '../ducks/data/movies/sagas';

export default function* rootSaga() {
  yield all([call(watchMoviesRequests)]);
}
