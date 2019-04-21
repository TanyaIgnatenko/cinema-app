import React from 'react';
import PropTypes from 'prop-types';
import { CalendarButton } from './DateInput';
import { FrequentDateButton } from './FrequentDateButton';

export const DateFilterContext = React.createContext({
  selectedDate: null,
  selectDate: () => {},
});

class DateFilter extends React.Component {
  static FrequentDateButton = FrequentDateButton;

  static CalendarButton = CalendarButton;

  static Context = DateFilterContext;

  render() {
    const { selectedDate, selectDate, children } = this.props;
    return (
      <DateFilterContext.Provider value={{ selectedDate, selectDate }}>
        {children}
      </DateFilterContext.Provider>
    );
  }
}

DateFilter.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  selectDate: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default DateFilter;
