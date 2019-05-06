import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Seances } from '../../common/Seances';
import { keepSeancesAt } from '../../utils/movies';

import './SeancesList.scss';
import { Spinner } from '../../../common/Spinner';
import { NoScheduleComponent } from '../../../common/NoScheduleComponent';
import { NotFoundComponent } from '../../../common/NotFoundComponent';

const SEANCES_STATE = {
  LOADING: 0,
  SCHEDULE_NOT_EXIST: 1,
  NOT_FOUND: 2,
  FOUND: 3,
};

function SeancesList({ seances, selectedRange, selectedDate, resetFiltersSettings }) {
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
      return <Spinner className='info-box' />;
    case SEANCES_STATE.SCHEDULE_NOT_EXIST:
      return <NoScheduleComponent className='info-box' />;
    case SEANCES_STATE.NOT_FOUND:
      return <NotFoundComponent className='info-box' resetSettings={resetFiltersSettings} />;
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
  resetFiltersSettings: PropTypes.func.isRequired,
};

SeancesList.defaultProps = {
  seances: null,
};

export default SeancesList;
