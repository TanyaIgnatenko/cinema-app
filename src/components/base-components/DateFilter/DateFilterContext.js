import React from 'react';

const DateFilterContext = React.createContext({
  selectedDate: null,
  selectDate: () => {},
});

export default DateFilterContext;
