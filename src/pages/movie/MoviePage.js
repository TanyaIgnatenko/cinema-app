import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Gallery } from './Gallery';
import { ErrorPage } from '../common/ErrorPage';
import { NotFoundPage } from '../common/NotFoundPage';

import { DateFilter } from '../movies/DateFilter';
import { TimeRangeSlider } from '../movies/TimeRangeSlider';
import { fetchMovieRequest } from '../../ducks/movies/actions';
import { selectMoviesError, selectSelectedMovie } from '../../ducks/movies/selectors';
import { TIME_SLIDER_RANGE } from '../movies/TimeRangeSlider/TimeRangeSlider';
import { getTodayDate } from '../../utils/date';

import './MoviePage.scss';

function MoviePage({ movie, fetchMovie, match, error }) {
  if (error) {
    return error.name === 'NotFoundError' ? <NotFoundPage /> : <ErrorPage />;
  }

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedRange, setSelectedRange] = useState(TIME_SLIDER_RANGE);

  const movieId = parseInt(match.params.id, 10);
  useEffect(() => {
    fetchMovie(movieId);
  }, []);

  return movie ? (
    <>
      <h1 className='page-title'>{movie.name}</h1>
      <Gallery items={movie.frames} />
      <p className='movie-description'>{movie.description}</p>
      <div className='movie-extra-info'>
        <li>
          <label className='label' htmlFor='genres'>
            Жанры:
          </label>
          <p id='genres'>{movie.genres.join(', ')}</p>
        </li>
        <li>
          <label className='label' htmlFor='duration'>
            Длительность:
          </label>
          <p id='duration'>{`${movie.duration} мин.`}</p>
        </li>
      </div>
      <DateFilter selectedDate={selectedDate} selectDate={setSelectedDate} />
      <TimeRangeSlider
        className='time-range-slider'
        selectedRange={selectedRange}
        selectRange={setSelectedRange}
      />
    </>
  ) : (
    <p>Загружается...</p>
  );
}

MoviePage.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    duration: PropTypes.number.isRequired,
    frames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    seances: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          startTime: PropTypes.number.isRequired,
          price: PropTypes.string.isRequired,
        }),
      ),
    ).isRequired,
  }),
  fetchMovie: PropTypes.func.isRequired,
  error: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  match: PropTypes.object.isRequired,
};

MoviePage.defaultProps = {
  movie: null,
  error: null,
};

const mapStateToProps = state => ({
  movie: selectSelectedMovie(state),
  error: selectMoviesError(state),
});

const mapDispatchToProps = {
  fetchMovie: fetchMovieRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviePage);
