import moment from 'moment';

import { APP_DATE_FORMAT } from '../constants';

const toMoment = date => moment(date, APP_DATE_FORMAT, true);

const toAppDateFormat = momentDate => momentDate.format(APP_DATE_FORMAT);

const getTodayDate = () => toAppDateFormat(moment());

const getTomorrowDate = () => toAppDateFormat(moment().add(1, 'days'));

const getDateAfterTomorrow = () => toAppDateFormat(moment().add(2, 'days'));

const getDateRange = (startDate, endDate) => {
  const currentDate = startDate.clone();
  const dateRange = [];
  while (currentDate.isSameOrBefore(endDate)) {
    dateRange.push(currentDate.clone());
    currentDate.add(1, 'days');
  }
  return dateRange;
};

export {
  toAppDateFormat,
  toMoment,
  getTodayDate,
  getTomorrowDate,
  getDateAfterTomorrow,
  getDateRange,
};
