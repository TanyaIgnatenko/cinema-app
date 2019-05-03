import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { GENRE } from '../../../constants';

import './Movie.scss';

const RUSSIAN_CURRENCY_SYMBOL = '\u20BD';

function Movie({ name, genres, poster, seances, className, ...props }) {
  return (
    <div className={classNames('movie-box', className)} {...props}>
      <img alt='movie poster' className='poster' src={poster} />
      <div className='main-info'>
        <p className='genres'>{genres.join(', ')}</p>
        <p className='title'>{name}</p>
      </div>
      <div className='seances'>
        {Object.keys(seances).map(
          technology =>
            seances[technology].length && (
              <div key={technology}>
                <p className='technology'>{technology}</p>
                <div className='tech-seances'>
                  {seances[technology].map(seance => (
                    <li key={seance.startTime}>
                      <div className='seance' onClick={() => {}}>
                        {seance.startTime}
                        <div className='price-tooltip'>
                          {`от ${seance.price} ${RUSSIAN_CURRENCY_SYMBOL}`}
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

Movie.propTypes = {
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
    ),
  }).isRequired,
  className: PropTypes.string,
};

Movie.defaultProps = {
  className: '',
};

export default Movie;
