import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Gallery } from './Gallery';
import { ErrorPage } from '../common/ErrorPage';
import { NotFoundPage } from '../common/NotFoundPage';
import { fetchMovieRequest } from '../../ducks/movies/actions';
import { selectMoviesError, selectSelectedMovie } from '../../ducks/movies/selectors';

function MoviePage({ movie, fetchMovie, match, error }) {
  const movieId = parseInt(match.params.id, 10);
  useEffect(() => {
    fetchMovie(movieId);
  }, []);

  if (error) {
    return error.name === 'NotFoundError' ? <NotFoundPage /> : <ErrorPage />;
  }

  return movie ? (
    <>
      <h1 className='page-title'>{movie.name}</h1>
      <Gallery items={movie.frames} />
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
