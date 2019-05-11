import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import classNames from 'classnames';

import { hasStarted } from '../../utils/movies';

import './Seances.scss';

const RUSSIAN_CURRENCY_SYMBOL = '\u20BD';

function Seances({ seances, className }) {
  return (
    <div className={classNames('seances', className)}>
      {Object.keys(seances).map(
        format =>
          seances[format].length && (
            <div key={format} className='format-seances-container'>
              <p className='format'>{format}</p>
              <div className='format-seances'>
                {seances[format].map(seance => {
                  return (
                    <li key={seance.startTime}>
                      <div
                        className={classNames('seance', hasStarted(seance) && 'has-started')}
                        onClick={hasStarted(seance) ? undefined : () => {}}
                      >
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
  );
}

Seances.propTypes = {
  seances: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ),
  ),
  className: PropTypes.string,
};

Seances.defaultProps = {
  seances: null,
  className: '',
};

export default Seances;
