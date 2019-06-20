import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Gallery } from '../../../base-components/Gallery';
import { Spinner } from '../../common/Spinner';
import { ErrorPage } from '../../common/ErrorPage';
import { SeancesListContainer } from './SeancesList';
import { DateFilter } from '../movies-page/DateFilter';
import { NotFoundPage } from '../../common/NotFoundPage';
import { fetchMovieRequest } from '../../../../ducks/data/movies/actions';
import { selectMoviesError, selectSelectedMovie } from '../../../../ducks/data/movies/selectors';
import { SEANCES_TIME_RANGE } from '../../../../constants';
import { getTodayDate } from '../../../../utils/date';

import './MoviePage.scss';
import { RangeSlider } from '../../../base-components/RangeSlider';
import { MINUTES_IN_HOUR, toTimeLabel } from '../../../../utils/time';

function MoviePage({ movie }) {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const [selectedRange, setSelectedRange] = useState(SEANCES_TIME_RANGE);
  const handleResetFiltersSettings = () => {
    setSelectedRange(SEANCES_TIME_RANGE);
  };

  return (
    <>
      <h1 className='page-title'>{movie.name}</h1>
      <Gallery items={movie.frames} className='movie-frames-gallery' />
      <p className='movie-description'>{movie.description}</p>
      <ul className='movie-extra-info'>
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
      </ul>
      <div className='schedule-container'>
        <h2 className='schedule-title'>Расписание</h2>
        <div className='filters-container'>
          <DateFilter
            className='movie-date-filter'
            selectedDate={selectedDate}
            selectDate={setSelectedDate}
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
        <SeancesListContainer
          movieName={movie.name}
          movieId={movie.id}
          selectedDate={selectedDate}
          selectedRange={selectedRange}
          resetFiltersSettings={handleResetFiltersSettings}
        />
      </div>
    </>
  );
}

MoviePage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    duration: PropTypes.number.isRequired,
    frames: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

// eslint-disable-next-line react/prop-types
function MoviePageContainer({ movie, fetchMovie, match, error, ...props }) {
  if (error) {
    return error.name === 'NotFoundError' ? <NotFoundPage /> : <ErrorPage />;
  }

  const movieId = parseInt(match.params.id, 10);
  useEffect(() => {
    fetchMovie(movieId);
  }, []);

  return movie ? (
    <MoviePage movie={movie} {...props} />
  ) : (
    <Spinner className='page-spinner-container' />
  );
}

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
)(MoviePageContainer);
