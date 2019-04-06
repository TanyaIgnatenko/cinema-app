import React from 'react';
import PropTypes from 'prop-types';
import { CalendarButton } from './CalendarButton';
import { FrequentDayButton } from './FrequentDateButton';

const DateFilterContext = React.createContext({
  selectedDate: null,
  selectDate: () => {},
});

class DateFilter extends React.Component {
  static FrequentDateButton = FrequentDayButton;

  static CalendarButton = CalendarButton;

  static Consumer = DateFilterContext.Consumer;

  render() {
    const { selectedDate, selectDate } = this.props;
    return <DateFilterContext.Provider value={{ selectedDate, selectDate }} />;
  }
}

DateFilter.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  selectDate: PropTypes.func.isRequired,
};

export default DateFilter;
