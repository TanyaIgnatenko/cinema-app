import React, { useState } from 'react';

import { Search } from './Search';
import { DateFilter } from './DateFilter';
import { MoviesListContainer } from './MoviesList';
import { RangeSlider } from '../../../base-components/RangeSlider';
import { MINUTES_IN_HOUR, toTimeLabel } from '../../../../utils/time';
import { SEANCES_TIME_RANGE } from '../../../../constants';
import { getTodayDate } from '../../../../utils/date';

import './MoviesPage.scss';

const MOVIE_SEARCH_PLACEHOLDER = 'Название';

function MoviesPage() {
  const [movieHint, setMovieHint] = useState('');
  const [selectedRange, setSelectedRange] = useState(SEANCES_TIME_RANGE);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const handleResetFiltersSettings = () => {
    setMovieHint('');
    setSelectedRange(SEANCES_TIME_RANGE);
  };

  return (
    <>
      <h1 className='page-title'>Расписание</h1>
      <DateFilter
        className='movies-date-filter'
        selectedDate={selectedDate}
        selectDate={setSelectedDate}
      />
      <div className='sub-filters'>
        <Search
          hint={movieHint}
          placeholder={MOVIE_SEARCH_PLACEHOLDER}
          onHintChange={event => setMovieHint(event.target.value)}
          resetHint={() => setMovieHint('')}
          className='search'
        />
        <RangeSlider
          className='time-range-slider'
          min={SEANCES_TIME_RANGE.start}
          max={SEANCES_TIME_RANGE.end}
          valuePerStep={MINUTES_IN_HOUR}
          selectedRange={selectedRange}
          onChange={setSelectedRange}
          formatLabel={toTimeLabel}
        />
      </div>
      <MoviesListContainer
        movieHint={movieHint}
        selectedRange={selectedRange}
        selectedDate={selectedDate}
        resetFiltersSettings={handleResetFiltersSettings}
      />
    </>
  );
}

export default MoviesPage;
