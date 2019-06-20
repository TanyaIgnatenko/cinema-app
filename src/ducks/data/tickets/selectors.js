export function selectReservationStatus(state) {
  return state.tickets.reservationStatus;
}

export function selectPaymentStatus(state) {
  return state.tickets.paymentStatus;
}
