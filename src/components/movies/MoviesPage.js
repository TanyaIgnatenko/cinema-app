import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DateFilter } from './DateFilter';

import {
  getDateAfterTomorrow,
  getTodayDate,
  getTomorrowDate,
  toAppDateFormat,
  toMoment,
} from '../../helpers/dateHelpers';

import '../../assets/scss/main.scss';

const TODAY_LABEL = 'Сегодня';
const TOMORROW_LABEL = 'Завтра';
const DEFAULT_DATE_INPUT_LABEL = 'Выбрать день';

function MoviesPage(props) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const dayAfterTomorrow = getDateAfterTomorrow();
  const DAY_AFTER_TOMORROW_LABEL = toMoment(getDateAfterTomorrow()).format(
    'dd, DD MMMM',
  );
  const minDate = toAppDateFormat(moment());
  const maxDate = toAppDateFormat(
    moment()
      .add(6, 'months')
      .endOf('month'),
  );

  return (
    <>
      <h1 className='pageTitle'>Расписание</h1>
      <DateFilter className='date-filter horizontal'>
        <DateFilter.FrequentDateButton date={today} label={TODAY_LABEL} />
        <DateFilter.FrequentDateButton date={tomorrow} label={TOMORROW_LABEL} />
        <DateFilter.FrequentDateButton
          date={dayAfterTomorrow}
          label={DAY_AFTER_TOMORROW_LABEL}
        />
        <DateFilter.DateInput
          defaultLabel={DEFAULT_DATE_INPUT_LABEL}
          getDateLabel={date => date.format('dd, DD MMMM')}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DateFilter>
    </>
  );
}

MoviesPage.propTypes = {};

export default MoviesPage;
