import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { DateInput } from './DateInput';
import { FrequentDateButton } from './FrequentDateButton';
import { selectSelectedDate } from '../../../ducks/date/selectors';
import { selectDate } from '../../../ducks/date/actions';
import { toAppDateFormat } from '../../../helpers/dateHelpers';

export const DateFilterContext = React.createContext({
  selectedDate: null,
  selectDate: () => {},
});

class DateFilter extends React.Component {
  static FrequentDateButton = FrequentDateButton;

  static DateInput = DateInput;

  static Context = DateFilterContext;

  componentDidMount() {
    const { selectDate } = this.props;
    const today = toAppDateFormat(moment());
    selectDate(today);
  }

  render() {
    const { selectedDate, selectDate, children, className } = this.props;
    return (
      <DateFilterContext.Provider value={{ selectedDate, selectDate }}>
        <div className={className}>{children}</div>
      </DateFilterContext.Provider>
    );
  }
}

DateFilter.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  selectDate: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  selectedDate: selectSelectedDate(state),
});

const mapDispatchToProps = {
  selectDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DateFilter);
