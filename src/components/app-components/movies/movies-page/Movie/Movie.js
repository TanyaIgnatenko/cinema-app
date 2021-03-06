import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import { Seances } from '../../common/Seances';
import { createRoute } from '../../../../../utils/routes';
import { ROUTE } from '../../../../../constants';

import './Movie.scss';

function Movie({ id, name, genres, poster, seances, className, history }) {
  const goToMoviePage = () => history.push(createRoute(ROUTE.MOVIE, { id }));

  return (
    <div className={classNames('movie-box', className)}>
      <img
        alt='movie poster'
        className='poster'
        src={poster}
        onClick={goToMoviePage}
      />
      <div className='main-info'>
        <p className='genres'>{genres.join(', ')}</p>
        <p className='title' onClick={goToMoviePage}>
          {name}
        </p>
      </div>
      <Seances movieName={name} seances={seances} className='seances' />
    </div>
  );
}

Movie.propTypes = {
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
  history: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Movie.defaultProps = {
  className: '',
};

export default withRouter(Movie);
