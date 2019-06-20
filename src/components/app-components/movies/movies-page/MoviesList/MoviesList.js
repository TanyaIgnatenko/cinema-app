import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Movie } from '../Movie';
import { keepSeancesAt } from '../../utils/movies';
import { NotFoundComponent } from '../../../common/NotFoundComponent';
import { NoScheduleComponent } from '../../../common/NoScheduleComponent';
import { Spinner } from '../../../common/Spinner';

import './MoviesList.scss';
import { fetchMoviesRequest } from '../../../../../ducks/data/movies/actions';
import { selectMovies } from '../../../../../ducks/data/movies/selectors';
import { connect } from 'react-redux';

const MOVIES_STATE = {
  LOADING: 0,
  SCHEDULE_NOT_EXIST: 1,
  NOT_FOUND: 2,
  FOUND: 3,
};

function getMoviesState(movies, selectedMovies) {
  if (!movies.length) {
    return MOVIES_STATE.SCHEDULE_NOT_EXIST;
  }
  if (!selectedMovies.length) {
    return MOVIES_STATE.NOT_FOUND;
  }
  return MOVIES_STATE.FOUND;
}

function MoviesList({ movies, movieHint, selectedRange, selectedDate, resetFiltersSettings }) {
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

  const moviesState = getMoviesState(movies, selectedMovies);
  switch (moviesState) {
    case MOVIES_STATE.LOADING:
      return <Spinner className='info-box' />;
    case MOVIES_STATE.SCHEDULE_NOT_EXIST:
      return <NoScheduleComponent className='info-box' />;
    case MOVIES_STATE.NOT_FOUND:
      return <NotFoundComponent className='info-box' resetSettings={resetFiltersSettings} />;
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
            id: PropTypes.string.isRequired,
            startTime: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
          }),
        ),
      ).isRequired,
    }),
  ).isRequired,
  movieHint: PropTypes.string.isRequired,
  selectedRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  selectedDate: PropTypes.string.isRequired,
  resetFiltersSettings: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
function MoviesListContainer({ movies, selectedDate, fetchMovies, ...props }) {
  useEffect(() => {
    fetchMovies(selectedDate);
  }, [selectedDate]);

  return movies ? <MoviesList movies={movies} selectedDate={selectedDate} {...props} /> : <Spinner className='info-box' />;
}

const mapStateToProps = state => ({
  movies: selectMovies(state),
});

const mapDispatchToProps = {
  fetchMovies: fetchMoviesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesListContainer);
