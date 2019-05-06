import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DateFilter } from '../../common/DateFilter';

import {
  getDateAfterTomorrow,
  getEndDateOfSixthMonthFromCurrent,
  getTodayDate,
  getTomorrowDate,
  toMoment,
} from '../../../utils/date';

const TODAY_LABEL = 'Сегодня';
const TOMORROW_LABEL = 'Завтра';
const DEFAULT_DATE_INPUT_LABEL = 'Выбрать день';

function DateFilterWrapper({ selectedDate, selectDate, className }) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const dayAfterTomorrow = getDateAfterTomorrow();
  const DAY_AFTER_TOMORROW_LABEL = toMoment(dayAfterTomorrow).format('dd, DD MMMM');

  const shouldShowSelectedDateOnDateInput =
    selectedDate &&
    selectedDate !== today &&
    selectedDate !== tomorrow &&
    selectedDate !== dayAfterTomorrow;

  const datesLabels = {
    [today]: TODAY_LABEL,
    [tomorrow]: TOMORROW_LABEL,
  };

  function getDateLabel(date) {
    if (date in datesLabels) return datesLabels[date];
    return toMoment(date).format('dd, DD MMMM');
  }

  const minDate = today;
  const maxDate = getEndDateOfSixthMonthFromCurrent();

  return (
    <DateFilter
      selectedDate={selectedDate}
      selectDate={selectDate}
      className={classNames('date-filter horizontal', className)}
    >
      <DateFilter.FrequentDateButton date={today} label={TODAY_LABEL} />
      <DateFilter.FrequentDateButton date={tomorrow} label={TOMORROW_LABEL} />
      <DateFilter.FrequentDateButton date={dayAfterTomorrow} label={DAY_AFTER_TOMORROW_LABEL} />
      <DateFilter.DateInput
        defaultLabel={DEFAULT_DATE_INPUT_LABEL}
        getDateLabel={getDateLabel}
        shouldShowSelectedDate={shouldShowSelectedDateOnDateInput}
        active={shouldShowSelectedDateOnDateInput}
        minDate={minDate}
        maxDate={maxDate}
      />
    </DateFilter>
  );
}
DateFilterWrapper.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  selectDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};

DateFilterWrapper.defaultProps = {
  className: '',
};

export default DateFilterWrapper;
