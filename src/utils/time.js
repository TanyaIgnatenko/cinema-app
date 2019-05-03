const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const toTimeLabel = minutes => {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR) % HOURS_IN_DAY;
  let minutesRest = minutes % MINUTES_IN_HOUR;
  minutesRest = minutesRest < 10 ? `0${minutesRest}` : minutesRest;
  return `${hours}:${minutesRest}`;
};

export { toTimeLabel, MINUTES_IN_HOUR, HOURS_IN_DAY };
