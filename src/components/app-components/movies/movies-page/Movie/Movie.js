import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import { Seances } from '../../common/Seances';
import { createRoute } from '../../../../../utils/routes';
import { ROUTE } from '../../../../../constants';

import './Movie.scss';

function Movie({ id, name, genres, poster, seances, className, history, ...props }) {
  const goToMoviePage = () => history.push(createRoute(ROUTE.MOVIE, { id }));

  return (
    <div onClick={goToMoviePage} className={classNames('movie-box', className)} {...props}>
      <img alt='movie poster' className='poster' src={poster} />
      <div className='main-info'>
        <p className='genres'>{genres.join(', ')}</p>
        <p className='title'>{name}</p>
      </div>
      <Seances seances={seances} className='seances' />
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
