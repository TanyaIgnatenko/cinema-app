import moment from 'moment/moment';

function keepSeancesAt(date, timeRange, seances) {
  let hasAtLeastOneSeance = false;
  const seancesFormats = Object.keys(seances);
  const filteredSeances = {};
  const momentRange = {
    start: moment(date).add(timeRange.start, 'm'),
    end: moment(date).add(timeRange.end, 'm'),
  };

  seancesFormats.forEach(format => {
    filteredSeances[format] = seances[format].filter(seance => {
      const seanceStartMoment = moment.unix(seance.startTime);
      return seanceStartMoment.isBetween(momentRange.start, momentRange.end, 'm', '[]');
    });

    hasAtLeastOneSeance = hasAtLeastOneSeance || filteredSeances[format].length;
  });

  return hasAtLeastOneSeance ? filteredSeances : null;
}

export { keepSeancesAt };
