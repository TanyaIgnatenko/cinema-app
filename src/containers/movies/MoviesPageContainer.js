import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { MoviesPage } from '../../components/movies';
import { selectSelectedDate } from '../../ducks/date/selectors';
import { selectMovies } from '../../ducks/movies/selectors';
import { toAppDateFormat } from '../../utils/date';
import { fetchMoviesRequest } from '../../ducks/movies/actions';
import { selectDate } from '../../ducks/date/actions';
import { GENRE } from '../../constants';

function MoviesPageContainer({ movies, selectedDate, selectDate, fetchMovies }) {
  useEffect(() => {
    const today = toAppDateFormat(moment());
    selectDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchMovies(selectedDate);
    }
  }, [selectedDate]);

  return <MoviesPage selectedMovies={movies} selectedDate={selectedDate} />;
}

const mapStateToProps = state => ({
  movies: selectMovies(state),
  selectedDate: selectSelectedDate(state),
});

MoviesPageContainer.propTypes = {
  selectedDate: PropTypes.string,
  selectDate: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
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
        '2D': PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
          }),
        ).isRequired,
        '3D': PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }).isRequired,
    }),
  ),
};

MoviesPageContainer.defaultProps = {
  selectedDate: null,
  movies: [],
};

const mapDispatchToProps = {
  selectDate,
  fetchMovies: fetchMoviesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesPageContainer);
