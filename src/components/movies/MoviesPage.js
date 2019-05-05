import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Movie } from './Movie';
import { Search } from './Search';
import { DateFilter } from './DateFilter';
import { TimeRangeSlider } from './TimeRangeSlider';
import { MINUTES_IN_HOUR, toTimeLabel } from '../../utils/time';
import { fetchMoviesRequest } from '../../ducks/movies/actions';
import { selectSelectedDate } from '../../ducks/date/selectors';
import { selectMovies } from '../../ducks/movies/selectors';
import { selectDate } from '../../ducks/date/actions';
import { keepSeancesAt } from './utils/movies';

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

function MoviesPage({ movies, selectedDate, fetchMovies, selectDate }) {
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

  useEffect(() => {
    selectDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchMovies(selectedDate);
    }
  }, [selectedDate]);

  const [movieHint, setMovieHint] = useState('');
  const [selectedRange, setSelectedRange] = useState(TIME_SLIDER_RANGE);

  const selectedMovies = useMemo(
    () =>
      movies
        .filter(movie => movie.name.toLowerCase().includes(movieHint.toLowerCase().trim()))
        .map(movie => ({
          ...movie,
          seances: keepSeancesAt(selectedDate, selectedRange, movie.seances),
        }))
        .filter(movie => movie.seances),
    [movies, movieHint, selectedRange],
  );

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
      {selectedMovies && (
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
      )}
    </>
  );
}

MoviesPage.propTypes = {
  selectedDate: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      poster: PropTypes.string.isRequired,
      seances: PropTypes.objectOf(
        PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.number.isRequired,
            price: PropTypes.string.isRequired,
          }),
        ),
      ).isRequired,
    }),
  ),
  selectDate: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired,
};

MoviesPage.defaultProps = {
  selectedDate: null,
  movies: null,
};

const mapStateToProps = state => ({
  movies: selectMovies(state),
  selectedDate: selectSelectedDate(state),
});

const mapDispatchToProps = {
  selectDate,
  fetchMovies: fetchMoviesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesPage);
