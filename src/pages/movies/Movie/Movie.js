import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { ROUTE } from '../../../constants';
import { createRoute } from '../../../utils/routes';

import './Movie.scss';
import { withRouter } from 'react-router-dom';

const RUSSIAN_CURRENCY_SYMBOL = '\u20BD';

function Movie({ id, name, genres, poster, seances, className, history, ...props }) {
  const goToMoviePage = () => history.push(createRoute(ROUTE.MOVIE, { id }));

  return (
    <div onClick={goToMoviePage} className={classNames('movie-box', className)} {...props}>
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
                  {seances[technology].map(seance => {
                    return (
                      <li key={seance.startTime}>
                        <div className='seance' onClick={() => {}}>
                          {moment.unix(seance.startTime).format('HH:mm')}
                          <div className='price-tooltip'>
                            {`от ${seance.price} ${RUSSIAN_CURRENCY_SYMBOL}`}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </div>
            ),
        )}
      </div>
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
        price: PropTypes.string.isRequired,
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
