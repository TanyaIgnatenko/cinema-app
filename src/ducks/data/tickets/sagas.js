import { all, call, takeLatest, put } from 'redux-saga/effects';

import { reserveTicketsError, reserveTicketsSuccess } from './actions';
import { RESERVE_TICKETS } from './action-types';
import * as services from './services';

function* reserveTickets({ seanceId, seatsId }) {
  try {
    const [reservedSeanceId, reservedSeatsId] = yield call(
      services.reserveTicketsRequest,
      seanceId,
      seatsId,
    );
    yield put(reserveTicketsSuccess(reservedSeanceId, reservedSeatsId));
  } catch (e) {
    yield put(reserveTicketsError());
  }
}

export function* watchTicketsRequests() {
  yield all([takeLatest(RESERVE_TICKETS.REQUEST, reserveTickets)]);
}
