import { all, call, takeLatest, put } from 'redux-saga/effects';

import {
  payTicketsError,
  payTicketsSuccess,
  reserveTicketsError,
  reserveTicketsSuccess,
} from './actions';
import { PAY_TICKETS, RESERVE_TICKETS } from './action-types';
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

function* payTickets({ seanceId, seatsId }) {
  try {
    const [payedSeanceId, payedSeatsId] = yield call(
      services.payTicketsRequest,
      seanceId,
      seatsId,
    );
    yield put(payTicketsSuccess(payedSeanceId, payedSeatsId));
  } catch (e) {
    yield put(payTicketsError(e));
  }
}

export function* watchTicketsRequests() {
  yield all([
    takeLatest(RESERVE_TICKETS.REQUEST, reserveTickets),
    takeLatest(PAY_TICKETS.REQUEST, payTickets),
  ]);
}
