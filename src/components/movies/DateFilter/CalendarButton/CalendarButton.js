import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../common/Button';
import { toMoment } from '../../../../helpers/dateHelpers';

function CalendarButton({ defaultLabel, isAllowedDate, getDateLabel }) {
  return <Button className='calendarBtn'>{defaultLabel}</Button>;
}

CalendarButton.propTypes = {
  defaultLabel: PropTypes.string,
  isAllowedDate: PropTypes.func,
  getDateLabel: PropTypes.func,
};

CalendarButton.defaultProps = {
  defaultLabel: 'Выбрать дату',
  isAllowedDate: () => true,
  getDateLabel: date => toMoment(date).format('DD MMMM'),
};

export default CalendarButton;
