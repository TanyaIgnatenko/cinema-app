import React from 'react';
import PropTypes from 'prop-types';

import { DateInput } from './DateInput';
import { DateFilterContext } from './index';
import { FrequentDateButton } from './FrequentDateButton';

class DateFilter extends React.Component {
  static DateInput = DateInput;

  static FrequentDateButton = FrequentDateButton;

  render() {
    const { selectedDate, selectDate, children, className } = this.props;
    return (
      <div className={className}>
        <DateFilterContext.Provider value={{ selectedDate, selectDate }}>
          <>{children}</>
        </DateFilterContext.Provider>
      </div>
    );
  }
}

DateFilter.propTypes = {
  selectedDate: PropTypes.string,
  selectDate: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
};

DateFilter.defaultProps = {
  selectedDate: null,
};

export default DateFilter;
