import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Gallery } from './Gallery';
import { SeancesList } from './SeancesList';
import { DateFilter } from '../movies-page/DateFilter';
import { ErrorPage } from '../../../base-components/ErrorPage';
import { NotFoundPage } from '../../../base-components/NotFoundPage';
import { TimeRangeSlider } from '../movies-page/TimeRangeSlider';
import { fetchMovieRequest, fetchSeancesRequest } from '../../../../ducks/movies/actions';
import { TIME_SLIDER_RANGE } from '../movies-page/TimeRangeSlider/TimeRangeSlider';
import { getTodayDate } from '../../../../utils/date';

import {
  selectMoviesError,
  selectSeances,
  selectSelectedMovie,
} from '../../../../ducks/movies/selectors';

import './MoviePage.scss';

function MoviePage({ movie, seances, fetchMovie, fetchSeances, match, error }) {
  if (error) {
    return error.name === 'NotFoundError' ? <NotFoundPage /> : <ErrorPage />;
  }

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedRange, setSelectedRange] = useState(TIME_SLIDER_RANGE);

  const movieId = parseInt(match.params.id, 10);
  useEffect(() => {
    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    fetchSeances(movieId, selectedDate);
  }, [selectedDate]);

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
      <div className='schedule-container'>
        <h2 className='schedule-title'>Расписание</h2>
        <div className='filters-container'>
          <DateFilter
            className='date-filter'
            selectedDate={selectedDate}
            selectDate={setSelectedDate}
          />
          <TimeRangeSlider
            className='time-range-slider'
            selectedRange={selectedRange}
            selectRange={setSelectedRange}
          />
        </div>
        <SeancesList seances={seances} selectedDate={selectedDate} selectedRange={selectedRange} />
      </div>
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
  }),
  seances: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
      }),
    ),
  ),
  fetchMovie: PropTypes.func.isRequired,
  fetchSeances: PropTypes.func.isRequired,
  error: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  match: PropTypes.object.isRequired,
};

MoviePage.defaultProps = {
  movie: null,
  seances: null,
  error: null,
};

const mapStateToProps = state => ({
  movie: selectSelectedMovie(state),
  seances: selectSeances(state),
  error: selectMoviesError(state),
});

const mapDispatchToProps = {
  fetchMovie: fetchMovieRequest,
  fetchSeances: fetchSeancesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviePage);
