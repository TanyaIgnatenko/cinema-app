import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { DateInput } from './DateInput';
import { FrequentDateButton } from './FrequentDateButton';
import { DateFilterContext } from '.';
import { selectDate } from '../../../ducks/date/actions';
import { toAppDateFormat } from '../../../helpers/dateHelpers';
import { selectSelectedDate } from '../../../ducks/date/selectors';

class DateFilter extends React.Component {
  static DateInput = DateInput;

  static FrequentDateButton = FrequentDateButton;

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
  selectedDate: PropTypes.string,
  selectDate: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
};

DateFilter.defaultProps = {
  selectedDate: null,
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
