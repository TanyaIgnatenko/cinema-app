import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Search } from './Search';
import { MoviesList } from './MoviesList';
import { DateFilter } from './DateFilter';
import { TimeRangeSlider } from './TimeRangeSlider';
import { fetchMoviesRequest } from '../../ducks/movies/actions';
import { selectMovies } from '../../ducks/movies/selectors';

import './MoviesPage.scss';
import '../../assets/scss/main.scss';
import { getTodayDate } from '../../utils/date';
import { TIME_SLIDER_RANGE } from './TimeRangeSlider/TimeRangeSlider';

const MOVIE_SEARCH_PLACEHOLDER = 'Название';

function MoviesPage({ movies, fetchMovies }) {
  const [movieHint, setMovieHint] = useState('');
  const [selectedRange, setSelectedRange] = useState(TIME_SLIDER_RANGE);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  useEffect(() => {
    if (selectedDate) {
      fetchMovies(selectedDate);
    }
  }, [selectedDate]);

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
      <MoviesList
        movies={movies}
        movieHint={movieHint}
        selectedRange={selectedRange}
        selectedDate={selectedDate}
      />
    </>
  );
}

MoviesPage.propTypes = {
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
  fetchMovies: PropTypes.func.isRequired,
};

MoviesPage.defaultProps = {
  movies: null,
};

const mapStateToProps = state => ({
  movies: selectMovies(state),
});

const mapDispatchToProps = {
  fetchMovies: fetchMoviesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesPage);
