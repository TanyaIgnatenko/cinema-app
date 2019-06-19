import moment from 'moment';

import { APP_DATE_FORMAT } from '../constants';

const toMoment = date => moment(date, APP_DATE_FORMAT, true);

const toAppDateFormat = momentDate => momentDate.format(APP_DATE_FORMAT);

const getTodayStartMoment = () => moment().startOf('day');

const getTodayDate = () => toAppDateFormat(getTodayStartMoment());

const getTomorrowDate = () =>
  toAppDateFormat(getTodayStartMoment().add(1, 'days'));

const getDateAfterTomorrow = () =>
  toAppDateFormat(getTodayStartMoment().add(2, 'days'));

const getEndDateOfSixthMonthFromCurrent = () =>
  toAppDateFormat(
    moment()
      .add(6, 'months')
      .endOf('month'),
  );

const dateRange = (startDate, endDate) => {
  const currentDate = startDate.clone();
  const dateRange = [];
  while (currentDate.isSameOrBefore(endDate)) {
    dateRange.push(currentDate.clone());
    currentDate.add(1, 'days');
  }
  return dateRange;
};

const bindTimeToDayMoment = (time, dayMoment) => {
  return dayMoment.clone().add(moment.duration(time));
};

const momentToUnixTime = momentDate => momentDate.unix();

export {
  toAppDateFormat,
  toMoment,
  getTodayStartMoment,
  getTodayDate,
  getTomorrowDate,
  getDateAfterTomorrow,
  getEndDateOfSixthMonthFromCurrent,
  dateRange,
  bindTimeToDayMoment,
  momentToUnixTime,
};
