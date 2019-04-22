import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { DateFilterContext } from '..';
import { Button } from '../../../common/Button';
import { Calendar } from '../../../common/Calendar';
import { Toggle } from '../../../common/Toggle';
import { ToggleIcon } from '../../../common/ToggleIcon';

import './DateInput.scss';

function DateInput({ minDate, maxDate, defaultLabel, getDateLabel }) {
  const [buttonLabel, setButtonLabel] = useState(defaultLabel);
  const { selectDate } = useContext(DateFilterContext);
  return (
    <Toggle>
      {(on, toggle) => (
        <div className='date-input-container'>
          <Button
            className='calendar-btn ignore-react-onclickoutside'
            onClick={toggle}
          >
            {buttonLabel}
            <ToggleIcon on={on} className='calendar-btn-icon' />
          </Button>
          {on && (
            <Calendar
              minDate={minDate}
              maxDate={maxDate}
              onDateSelected={date => selectDate(date)}
              onDateEnter={date => setButtonLabel(getDateLabel(date))}
              onDateLeave={() => setButtonLabel(defaultLabel)}
              closeCalendar={toggle}
              closeOnSelect
            />
          )}
        </div>
      )}
    </Toggle>
  );
}

DateInput.propTypes = {
  defaultLabel: PropTypes.string,
  getDateLabel: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
};

DateInput.defaultProps = {
  defaultLabel: 'Выбрать дату',
  getDateLabel: date => date.format('DD MMMM'),
  minDate: null,
  maxDate: null,
};

export default DateInput;
