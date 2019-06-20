import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Seances } from '../../common/Seances';
import { keepSeancesAt } from '../../utils/movies';
import { Spinner } from '../../../common/Spinner';
import { NoScheduleComponent } from '../../../common/NoScheduleComponent';
import { NotFoundComponent } from '../../../common/NotFoundComponent';

import { selectSelectedMovieSeances } from '../../../../../ducks/data/movies/selectors';
import { fetchSeancesRequest } from '../../../../../ducks/data/movies/actions';

import './SeancesList.scss';

const SEANCES_STATE = {
  LOADING: 0,
  SCHEDULE_NOT_EXIST: 1,
  NOT_FOUND: 2,
  FOUND: 3,
};

function getSeancesState(seances, selectedSeances) {
  if (_.isEmpty(seances)) {
    return SEANCES_STATE.SCHEDULE_NOT_EXIST;
  }
  if (!selectedSeances) {
    return SEANCES_STATE.NOT_FOUND;
  }
  return SEANCES_STATE.FOUND;
}

function SeancesList({
  movieName,
  seances,
  selectedRange,
  selectedDate,
  resetFiltersSettings,
}) {
  const selectedSeances = useMemo(
    () =>
      seances ? keepSeancesAt(selectedDate, selectedRange, seances) : null,
    [seances, selectedRange],
  );

  const seancesState = getSeancesState(seances, selectedSeances);
  switch (seancesState) {
    case SEANCES_STATE.LOADING:
      return;
    case SEANCES_STATE.SCHEDULE_NOT_EXIST:
      return <NoScheduleComponent className='info-box' />;
    case SEANCES_STATE.NOT_FOUND:
      return (
        <NotFoundComponent
          className='info-box'
          resetSettings={resetFiltersSettings}
        />
      );
    case SEANCES_STATE.FOUND:
      return (
        <div className='seances-list'>
          <Seances movieName={movieName} seances={selectedSeances} className='seances' />
        </div>
      );
  }
}

SeancesList.propTypes = {
  seances: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        startTime: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ),
  ).isRequired,
  selectedRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  selectedDate: PropTypes.string.isRequired,
  resetFiltersSettings: PropTypes.func.isRequired,
};

function SeancesListContainer({
  movieId,
  seances,
  selectedDate,
  fetchSeances,
  ...props
}) {
  useEffect(() => {
    fetchSeances(movieId, selectedDate);
  }, [selectedDate]);

  return seances ? (
    <SeancesList seances={seances} selectedDate={selectedDate} {...props} />
  ) : (
    <Spinner className='info-box' />
  );
}

const mapStateToProps = state => ({
  seances: selectSelectedMovieSeances(state),
});

const mapDispatchToProps = {
  fetchSeances: fetchSeancesRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeancesListContainer);
