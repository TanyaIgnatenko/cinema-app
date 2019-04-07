import React from 'react';
import PropTypes from 'prop-types';

import { DateFilter } from './DateFilter';
import { CalendarButton } from './DateFilter/CalendarButton';
import { Toggle } from '../common/Button';

import {
  getDateAfterTomorrow,
  getTodayDate,
  getTomorrowDate,
  toMoment,
} from '../../helpers/dateHelpers';

import downArrowIcon from '../../assets/images/down-arrow.svg';

const TODAY_LABEL = 'Сегодня';
const TOMORROW_LABEL = 'Завтра';
const DEFAULT_CALENDAR_BTN_LABEL = 'Выбрать день';

function isAllowedDate(date) {}

function getDateLabel(date) {}

const calendar = (
  <DateFilter.Calendar
    isAllowedDate={isAllowedDate}
    getDateLabel={getDateLabel}
  />
);
function MoviesPage(props) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const dayAfterTomorrow = getDateAfterTomorrow();
  const DAY_AFTER_TOMORROW_LABEL = toMoment(getDateAfterTomorrow()).format(
    'dd, DD MMMM',
  );

  return (
    <>
      <h1 className='pageTitle'>Расписание</h1>
      <DateFilter>
        <DateFilter.FrequentDateButton date={today} label={TODAY_LABEL} />
        <DateFilter.FrequentDateButton date={tomorrow} label={TOMORROW_LABEL} />
        <DateFilter.FrequentDateButton
          date={dayAfterTomorrow}
          label={DAY_AFTER_TOMORROW_LABEL}
        />
        <DateFilter.CalendarButton
          defaultLabel={DEFAULT_CALENDAR_BTN_LABEL}
          calendar={calendar}
        />
      </DateFilter>
    </>
  );
}

MoviesPage.propTypes = {};

export default MoviesPage;
