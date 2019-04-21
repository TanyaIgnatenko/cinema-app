import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateFilter } from '..';
import { Button } from '../../../common/Button';
import { Calendar } from '../../../common/Calendar';
import { Toggle } from '../../../common/Toggle';
import { ToggleIcon } from '../../../common/ToggleIcon';
import { toMoment } from '../../../../helpers/dateHelpers';

import './DateInput.scss';

class DateInput extends React.Component {
  state = {
    buttonLabel: this.props.defaultLabel,
  };

  handleDateSelected = date => {
    const { selectDate } = useContext(DateFilter.Context);
    selectDate(date);
  };

  handleDateEnter = date => {
    const { getDateLabel } = this.props;
    this.setState({ buttonLabel: getDateLabel(date) });
  };

  handleDateLeave = () => {
    const { defaultLabel } = this.props;
    this.setState({ buttonLabel: defaultLabel });
  };

  render() {
    const { minDate, maxDate } = this.props;
    const { buttonLabel } = this.state;

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
                onDateSelected={date => {
                  this.handleDateSelected(date);
                  toggle();
                }}
                onDateEnter={this.handleDateEnter}
                onDateLeave={this.handleDateLeave}
                closeCalendar={toggle}
                minDate={minDate}
                maxDate={maxDate}
              />
            )}
          </div>
        )}
      </Toggle>
    );
  }
}

DateInput.propTypes = {
  defaultLabel: PropTypes.string,
  getDateLabel: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
};

DateInput.defaultProps = {
  defaultLabel: 'Выбрать дату',
  getDateLabel: date => toMoment(date).format('DD MMMM'),
  minDate: null,
  maxDate: null,
};

export default DateInput;
