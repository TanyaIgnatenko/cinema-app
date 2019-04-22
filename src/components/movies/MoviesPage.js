import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Search } from './Search';
import { DateFilter } from './DateFilter';
import { selectSelectedDate } from '../../ducks/date/selectors';

import {
  getDateAfterTomorrow,
  getEndDateOfSixthMonthFromCurrent,
  getTomorrowDate,
  getTodayDate,
  toMoment,
} from '../../helpers/dateHelpers';

import './MoviesPage.scss';
import '../../assets/scss/main.scss';

const TODAY_LABEL = 'Сегодня';
const TOMORROW_LABEL = 'Завтра';
const DEFAULT_DATE_INPUT_LABEL = 'Выбрать день';
const MOVIE_SEARCH_PLACEHOLDER = 'Название';

function MoviesPage({ selectedDate }) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const dayAfterTomorrow = getDateAfterTomorrow();
  const DAY_AFTER_TOMORROW_LABEL = toMoment(dayAfterTomorrow).format(
    'dd, DD MMMM',
  );

  const shouldShowSelectedDateOnDateInput =
    selectedDate &&
    selectedDate !== today &&
    selectedDate !== tomorrow &&
    selectedDate !== dayAfterTomorrow;

  const datesLabels = {
    [today]: TODAY_LABEL,
    [tomorrow]: TOMORROW_LABEL,
  };
  const getDateLabel = date => {
    if (date in datesLabels) return datesLabels[date];
    return toMoment(date).format('dd, DD MMMM');
  };

  const minDate = today;
  const maxDate = getEndDateOfSixthMonthFromCurrent();

  const [movieHint, setMovieHint] = useState('');
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
          getDateLabel={getDateLabel}
          shouldShowSelectedDate={shouldShowSelectedDateOnDateInput}
          active={shouldShowSelectedDateOnDateInput}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DateFilter>
      <Search
        hint={movieHint}
        placeholder={MOVIE_SEARCH_PLACEHOLDER}
        onHintChange={event => setMovieHint(event.target.value)}
        resetHint={() => setMovieHint('')}
        className='search'
      />
    </>
  );
}

MoviesPage.propTypes = {
  selectedDate: PropTypes.string,
};

MoviesPage.defaultProps = {
  selectedDate: null,
};

const mapStateToProps = state => ({
  selectedDate: selectSelectedDate(state),
});

export default connect(mapStateToProps)(MoviesPage);
