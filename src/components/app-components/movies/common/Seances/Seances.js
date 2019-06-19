import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import classNames from 'classnames';

import { showModal } from '../../../../../ducks/ui/modals/actions';
import { MODAL, RUSSIAN_CURRENCY_SYMBOL } from '../../../../../constants';
import { hasStarted } from '../../utils/movies';

import './Seances.scss';
import { connect } from 'react-redux';
import { Tooltip } from '../../../../base-components/Tooltip';

function Seances({ movieName, seances, className, showModal }) {
  const goToSeanceTicketsPage = useCallback((movieName, seance) => {
    const modalProps = { movieName, ...seance };
    showModal(MODAL.SEANCE_TICKETS, modalProps);
  }, []);

  return (
    <div className={classNames('seances', className)}>
      {Object.keys(seances).map(
        format =>
          seances[format].length && (
            <div key={format} className='format-seances-container'>
              <p className='format'>{format}</p>
              <ul className='format-seances'>
                {seances[format].map(seance => {
                  return (
                    <li key={seance.startTime}>
                      <button
                        className={classNames(
                          'seance',
                          hasStarted(seance) && 'has-started',
                          !hasStarted(seance) && 'beeem',
                        )}
                        onClick={() => goToSeanceTicketsPage(movieName, seance)}
                        disabled={hasStarted(seance)}
                      >
                        {moment.unix(seance.startTime).format('HH:mm')}
                        <Tooltip className='price-tooltip'>
                          {`от ${seance.price} ${RUSSIAN_CURRENCY_SYMBOL}`}
                        </Tooltip>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ),
      )}
    </div>
  );
}

Seances.propTypes = {
  movieName: PropTypes.string.isRequired,
  seances: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ),
  ),
  showModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Seances.defaultProps = {
  seances: null,
  className: '',
};

const mapDispatchToProps = {
  showModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(Seances);
