import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Seances } from './Seances';
import { keepSeancesAt } from '../../movies/MoviesList/utils/movies';

import './SeancesList.scss';

const SEANCES_STATE = {
  LOADING: 0,
  SCHEDULE_NOT_EXIST: 1,
  NOT_FOUND: 2,
  FOUND: 3,
};

function SeancesList({ seances, selectedRange, selectedDate }) {
  const selectedSeances = useMemo(
    () => (seances ? keepSeancesAt(selectedDate, selectedRange, seances) : null),
    [seances, selectedRange],
  );

  let seancesState;
  if (!seances) {
    seancesState = SEANCES_STATE.LOADING;
  } else if (_.isEmpty(seances)) {
    seancesState = SEANCES_STATE.SCHEDULE_NOT_EXIST;
  } else if (!selectedSeances) {
    seancesState = SEANCES_STATE.NOT_FOUND;
  } else {
    seancesState = SEANCES_STATE.FOUND;
  }

  switch (seancesState) {
    case SEANCES_STATE.LOADING:
      return (
        <div className='seances-info-box'>
          <div className='seances-info loading'>Загружаются</div>
        </div>
      );
    case SEANCES_STATE.SCHEDULE_NOT_EXIST:
      return (
        <div className='seances-info-box'>
          <div className='seances-info no-schedule'>Расписание на этот день не найдено</div>
        </div>
      );
    case SEANCES_STATE.NOT_FOUND:
      return (
        <div className='seances-info-box'>
          <div className='seances-info no-found'>
            По вашему запросу не нашлись сеансы. Сбросьте настройки.
          </div>
        </div>
      );
    case SEANCES_STATE.FOUND:
      return (
        <div className='seances-list'>
          <Seances seances={selectedSeances} className='seances' />
        </div>
      );
  }
}

SeancesList.propTypes = {
  seances: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
      }),
    ),
  ),
  selectedRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  selectedDate: PropTypes.string.isRequired,
};

SeancesList.defaultProps = {
  seances: null,
};

export default SeancesList;
