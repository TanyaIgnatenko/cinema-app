import { randomBoolean } from '../../../utils/randomBoolean';

export function reserveTicketsRequest(seanceId, seatsId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reservationSuccessed = randomBoolean();
      if (reservationSuccessed) {
        resolve([seanceId, seatsId]);
      } else {
        reject(new Error('Tickets are taken'));
      }
    }, 1000);
  });
}

export function payTicketsRequest(seanceId, seatsId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([seanceId, seatsId]);
    }, 1000);
  });
}
