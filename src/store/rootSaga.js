import { all, call } from 'redux-saga/effects';
import { watchMoviesRequests } from '../ducks/data/movies/sagas';
import { watchTicketsRequests } from '../ducks/data/tickets/sagas';

export default function* rootSaga() {
  yield all([call(watchMoviesRequests), call(watchTicketsRequests)]);
}
