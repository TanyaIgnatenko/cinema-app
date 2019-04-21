import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateFilter } from '..';
import { Calendar } from '../../../common/Calendar';
import { Toggle } from '../../../common/Toggle';
import { Button } from '../../../common/Button';
import { toMoment } from '../../../../helpers/dateHelpers';
import { ToggleIcon } from '../../../common/ToggleIcon';

class DateInput {
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
    const { isAllowedDate } = this.props;
    const { buttonLabel } = this.state;
    return (
      <Toggle>
        {(on, toggle) => (
          <>
            <Button className='calendarBtn'>
              <>
                {buttonLabel}
                <ToggleIcon on={on} onClick={toggle} />
              </>
            </Button>
            {on && (
              <Calendar
                onDateSelected={date => {
                  this.handleDateSelected(date);
                  toggle();
                }}
                onDateEnter={this.handleDateEnter}
                onDateLeave={this.handleDateLeave}
                isAllowedDate={isAllowedDate}
              />
            )}
          </>
        )}
      </Toggle>
    );
  }
}

DateInput.propTypes = {
  defaultLabel: PropTypes.string,
  isAllowedDate: PropTypes.func,
  getDateLabel: PropTypes.func,
};

DateInput.defaultProps = {
  defaultLabel: 'Выбрать дату',
  isAllowedDate: () => true,
  getDateLabel: date => toMoment(date).format('DD MMMM'),
};

export default DateInput;
