import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DateFilterContext } from '../index';

import './FrequentDateButton.scss';

function FrequentDateButton({ date, label }) {
  const { selectedDate, selectDate } = useContext(DateFilterContext);
  const isSelected = date === selectedDate;
  return (
    <button
      onClick={() => (!isSelected ? selectDate(date) : false)}
      className={classNames('frequent-date-btn', isSelected && 'selected')}
    >
      {label}
    </button>
  );
}

FrequentDateButton.propTypes = {
  date: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FrequentDateButton;
