const HOURS_IN_DAY = 24;

function getHoursRange(startHour, endHour) {
  const hoursRange = [];
  const endHourInSameDaySystem =
    endHour <= startHour ? HOURS_IN_DAY + endHour : endHour;
  for (
    let currentHour = startHour;
    currentHour <= endHourInSameDaySystem;
    ++currentHour
  ) {
    const hour =
      currentHour < HOURS_IN_DAY ? currentHour : currentHour - HOURS_IN_DAY;
    hoursRange.push(hour);
  }
  return hoursRange;
}

export { getHoursRange };
