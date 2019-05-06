import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DateFilterContext } from '..';
import { Button } from '../../../common/Button';
import { Calendar } from '../../../common/Calendar';
import { Toggle } from '../../../common/Toggle';
import { ToggleIcon } from '../../../common/ToggleIcon';

import './DateInput.scss';

function DateInput({
  minDate,
  maxDate,
  defaultLabel,
  getDateLabel,
  shouldShowSelectedDate,
  active,
}) {
  const [buttonLabel, setButtonLabel] = useState(defaultLabel);
  const { selectDate, selectedDate } = useContext(DateFilterContext);

  useEffect(() => {
    shouldShowSelectedDate
      ? setButtonLabel(getDateLabel(selectedDate))
      : setButtonLabel(defaultLabel);
  }, [shouldShowSelectedDate, selectedDate]);

  return (
    <Toggle>
      {(on, toggle) => (
        <div className='date-input-container'>
          <Button
            className={classNames(
              'calendar-btn ignore-react-onclickoutside',
              active && 'active',
            )}
            onClick={toggle}
          >
            {buttonLabel}
            <ToggleIcon on={on} className='calendar-btn-icon' />
          </Button>
          {on && (
            <Calendar
              initialMonth={selectedDate}
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
  shouldShowSelectedDate: PropTypes.bool,
  active: PropTypes.bool,
};

DateInput.defaultProps = {
  defaultLabel: 'Выбрать дату',
  getDateLabel: date => date.format('DD MMMM'),
  minDate: null,
  maxDate: null,
  shouldShowSelectedDate: false,
  active: false,
};

export default DateInput;
