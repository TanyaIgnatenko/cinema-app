import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Movie } from '../Movie';
import { keepSeancesAt } from './utils/movies';

const MOVIES_STATE = {
  LOADING: 0,
  SCHEDULE_NOT_EXIST: 1,
  NOT_FOUND: 2,
  FOUND: 3,
};

function MoviesList({ movies, movieHint, selectedRange, selectedDate }) {
  const selectedMovies = useMemo(
    () =>
      movies
        ? movies
            .filter(movie => movie.name.toLowerCase().includes(movieHint.toLowerCase().trim()))
            .map(movie => ({
              ...movie,
              seances: keepSeancesAt(selectedDate, selectedRange, movie.seances),
            }))
            .filter(movie => movie.seances)
        : null,
    [movies, movieHint, selectedRange],
  );

  let moviesState;
  if (!movies) {
    moviesState = MOVIES_STATE.LOADING;
  } else if (!movies.length) {
    moviesState = MOVIES_STATE.SCHEDULE_NOT_EXIST;
  } else if (!selectedMovies.length) {
    moviesState = MOVIES_STATE.NOT_FOUND;
  } else {
    moviesState = MOVIES_STATE.FOUND;
  }

  switch (moviesState) {
    case MOVIES_STATE.LOADING:
      return (
        <div className='movies-info-box'>
          <div className='movies-info loading'>Загружаются</div>
        </div>
      );
    case MOVIES_STATE.SCHEDULE_NOT_EXIST:
      return (
        <div className='movies-info-box'>
          <div className='movies-info no-schedule'>Расписание на этот день не найдено</div>
        </div>
      );
    case MOVIES_STATE.NOT_FOUND:
      return (
        <div className='movies-info-box'>
          <div className='movies-info no-found'>
            По вашему запросу не нашлись сеансы. Сбросьте настройки.
          </div>
        </div>
      );
    case MOVIES_STATE.FOUND:
      return (
        <ul className='movie-list'>
          {selectedMovies.map(movie => (
            <Movie
              key={movie.id}
              id={movie.id}
              name={movie.name}
              genres={movie.genres}
              poster={movie.poster}
              seances={movie.seances}
            />
          ))}
        </ul>
      );
  }
}

MoviesList.propTypes = {
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
  movieHint: PropTypes.string.isRequired,
  selectedRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  selectedDate: PropTypes.string.isRequired,
};

MoviesList.defaultProps = {
  movies: null,
};

export default MoviesList;
