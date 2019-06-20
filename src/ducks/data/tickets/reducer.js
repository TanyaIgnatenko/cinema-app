import {
  PAY_TICKETS,
  RESERVE_TICKETS,
  RESET_PAYMENT_STATUS,
  RESET_RESERVATION_STATUS,
} from './action-types';

import { STATUS } from '../../../constants';

const initialState = {
  paymentStatus: STATUS.IDLE,
  reservationStatus: STATUS.IDLE,
};

export const tickets = (state = initialState, action) => {
  switch (action.type) {
    case RESERVE_TICKETS.REQUEST: {
      return {
        ...state,
        reservationStatus: STATUS.REQUEST,
      };
    }
    case RESERVE_TICKETS.SUCCESS: {
      const reservationCancelled = state.reservationStatus === STATUS.IDLE;
      return {
        ...state,
        reservationStatus: reservationCancelled ? STATUS.IDLE : STATUS.SUCCESS,
      };
    }
    case RESERVE_TICKETS.ERROR: {
      const reservationCancelled = state.reservationStatus === STATUS.IDLE;
      return {
        ...state,
        reservationStatus: reservationCancelled ? STATUS.IDLE : STATUS.ERROR,
      };
    }
    case RESET_RESERVATION_STATUS: {
      return {
        ...state,
        reservationStatus: STATUS.IDLE,
      };
    }
    case PAY_TICKETS.REQUEST: {
      return {
        ...state,
        paymentStatus: STATUS.REQUEST,
      };
    }
    case PAY_TICKETS.SUCCESS: {
      const paymentCancelled = state.paymentStatus === STATUS.IDLE;
      return {
        ...state,
        paymentStatus: paymentCancelled ? STATUS.IDLE : STATUS.SUCCESS,
      };
    }
    case PAY_TICKETS.ERROR: {
      return {
        ...state,
        paymentStatus: STATUS.ERROR,
      };
    }
    case RESET_PAYMENT_STATUS: {
      return {
        ...state,
        paymentStatus: STATUS.IDLE,
      };
    }
    default: {
      return state;
    }
  }
};
