import React, { useState } from 'react';

import { Search } from './Search';
import { DateFilter } from './DateFilter';
import { TimeRangeSlider } from './TimeRangeSlider';
import { MoviesListContainer } from './MoviesList';

import { TIME_SLIDER_RANGE } from './TimeRangeSlider/TimeRangeSlider';
import { getTodayDate } from '../../../../utils/date';

import './MoviesPage.scss';
import '../../../../assets/scss/main.scss';

const MOVIE_SEARCH_PLACEHOLDER = 'Название';

function MoviesPage() {
  const [movieHint, setMovieHint] = useState('');
  const [selectedRange, setSelectedRange] = useState(TIME_SLIDER_RANGE);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const handleResetFiltersSettings = () => {
    setMovieHint('');
    setSelectedRange(TIME_SLIDER_RANGE);
  };

  return (
    <>
      <h1 className='page-title'>Расписание</h1>
      <DateFilter selectedDate={selectedDate} selectDate={setSelectedDate} />
      <div className='sub-filters'>
        <Search
          hint={movieHint}
          placeholder={MOVIE_SEARCH_PLACEHOLDER}
          onHintChange={event => setMovieHint(event.target.value)}
          resetHint={() => setMovieHint('')}
          className='search'
        />
        <TimeRangeSlider
          className='time-range-slider'
          selectedRange={selectedRange}
          selectRange={setSelectedRange}
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
