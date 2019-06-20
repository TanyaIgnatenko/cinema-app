import { RESERVE_TICKETS, RESET_RESERVATION_STATUS } from './action-types';

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
