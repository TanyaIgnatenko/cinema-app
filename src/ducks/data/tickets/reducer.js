import { RESERVE_TICKETS, RESET_RESERVATION_STATUS } from './action-types';
import { STATUS } from '../../../constants';

const initialState = {
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
      return {
        ...state,
        reservationStatus: STATUS.SUCCESS,
      };
    }
    case RESERVE_TICKETS.ERROR: {
      return {
        ...state,
        reservationStatus: STATUS.ERROR,
      };
    }
    case RESET_RESERVATION_STATUS: {
      return {
        ...state,
        reservationStatus: STATUS.IDLE,
      };
    }
    default: {
      return state;
    }
  }
};
