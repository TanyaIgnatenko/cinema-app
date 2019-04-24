import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Movie } from './Movie';
import { Search } from './Search';
import { DateFilter } from './DateFilter';
import { TimeRangeSlider } from './TimeRangeSlider';
import { GENRE } from '../../constants';

import {
  toMoment,
  getTodayDate,
  getTomorrowDate,
  getDateAfterTomorrow,
  getEndDateOfSixthMonthFromCurrent,
} from '../../helpers/dateHelpers';

import './MoviesPage.scss';
import '../../assets/scss/main.scss';

const TODAY_LABEL = 'Сегодня';
const TOMORROW_LABEL = 'Завтра';
const DEFAULT_DATE_INPUT_LABEL = 'Выбрать день';
const MOVIE_SEARCH_PLACEHOLDER = 'Название';

function MoviesPage({ selectedDate, selectedMovies }) {
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
      <div className='sub-filters'>
        <Search
          hint={movieHint}
          placeholder={MOVIE_SEARCH_PLACEHOLDER}
          onHintChange={event => setMovieHint(event.target.value)}
          resetHint={() => setMovieHint('')}
          className='search'
        />
        <TimeRangeSlider selectedRange={{ start: 10, end: 2 }} className='time-range-slider'/>
      </div>
      <ul className='movie-list'>
        {selectedMovies.map(movie => (
          <Movie
            key={movie.name}
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
        '2d': PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
          }),
        ).isRequired,
        '3d': PropTypes.arrayOf(
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
