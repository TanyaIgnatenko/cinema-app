import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Movie } from './Movie';
import { Search } from './Search';
import { DateFilter } from './DateFilter';
import { TimeRangeSlider } from './TimeRangeSlider';
import { MINUTES_IN_HOUR, toTimeLabel } from '../../utils/time';
import { GENRE } from '../../constants';

import {
  toMoment,
  getTodayDate,
  getTomorrowDate,
  getDateAfterTomorrow,
  getEndDateOfSixthMonthFromCurrent,
} from '../../utils/date';

import './MoviesPage.scss';
import '../../assets/scss/main.scss';

const TODAY_LABEL = 'Сегодня';
const TOMORROW_LABEL = 'Завтра';
const DEFAULT_DATE_INPUT_LABEL = 'Выбрать день';
const MOVIE_SEARCH_PLACEHOLDER = 'Название';

const TIME_SLIDER_RANGE = {
  start: 10 * MINUTES_IN_HOUR,
  end: 26 * MINUTES_IN_HOUR,
};

function MoviesPage({ selectedDate, selectedMovies }) {
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

  const [movieHint, setMovieHint] = useState('');
  const [selectedRange, setSelectedRange] = useState(TIME_SLIDER_RANGE);

  return (
    <>
      <h1 className='pageTitle'>Расписание</h1>
      <DateFilter className='date-filter horizontal'>
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
      <div className='sub-filters'>
        <Search
          hint={movieHint}
          placeholder={MOVIE_SEARCH_PLACEHOLDER}
          onHintChange={event => setMovieHint(event.target.value)}
          resetHint={() => setMovieHint('')}
          className='search'
        />
        <TimeRangeSlider
          range={TIME_SLIDER_RANGE}
          timeUnitMinutes={60}
          selectedRange={selectedRange}
          onSelectedRangeChange={setSelectedRange}
          formatLabel={toTimeLabel}
          className='time-range-slider'
        />
      </div>
      <ul className='movie-list'>
        {selectedMovies.map(movie => (
          <Movie
            key={movie.id}
            name={movie.name}
            genres={movie.genres}
            poster={movie.poster}
            seances={movie.seances}
          />
        ))}
      </ul>
    </>
  );
}

MoviesPage.propTypes = {
  selectedDate: PropTypes.string,
  selectedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.oneOf([
          GENRE.COMEDY,
          GENRE.ACTION,
          GENRE.HORROR,
          GENRE.TRILLER,
          GENRE.DETECTIV,
          GENRE.MELODRAMA,
          GENRE.FANTASY,
          GENRE.ADVENTURES,
          GENRE.BIOGRAPHY,
        ]),
      ).isRequired,
      poster: PropTypes.string.isRequired,
      seances: PropTypes.shape({
        '2D': PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
          }),
        ).isRequired,
        '3D': PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
          }),
        ),
      }).isRequired,
    }),
  ).isRequired,
};

MoviesPage.defaultProps = {
  selectedDate: null,
};

export default MoviesPage;
