export function reserveTicketsRequest(seanceId, seatsId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([seanceId, seatsId]);
    }, 1000);
  });
}

export function payTicketsRequest(seanceId, seatsId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([seanceId, seatsId]);
    }, 1000);
  });
}
