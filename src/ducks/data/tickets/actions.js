import {
  PAY_TICKETS,
  RESERVE_TICKETS,
  RESET_PAYMENT_STATUS,
  RESET_RESERVATION_STATUS,
} from './action-types';

export const reserveTicketsRequest = (seanceId, seatsId) => {
  return {
    type: RESERVE_TICKETS.REQUEST,
    seanceId,
    seatsId,
  };
};

export const reserveTicketsSuccess = (seanceId, reservedSeatsId) => {
  return {
    type: RESERVE_TICKETS.SUCCESS,
    reservedSeatsId,
  };
};

export const reserveTicketsError = error => {
  return {
    type: RESERVE_TICKETS.ERROR,
    error,
  };
};

export const resetReservationStatus = () => {
  return {
    type: RESET_RESERVATION_STATUS,
  };
};

export const payTicketsRequest = (seanceId, seatsId) => {
  return {
    type: PAY_TICKETS.REQUEST,
    seanceId,
    seatsId,
  };
};

export const payTicketsSuccess = (seanceId, seatsId) => {
  return {
    type: PAY_TICKETS.SUCCESS,
    seanceId,
    seatsId,
  };
};

export const payTicketsError = error => {
  return {
    type: PAY_TICKETS.ERROR,
    error,
  };
};

export const resetPaymentStatus = () => {
  return {
    type: RESET_PAYMENT_STATUS,
  };
};
