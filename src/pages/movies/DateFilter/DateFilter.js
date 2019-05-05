import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DateFilterContext } from '.';
import { DateInput } from './DateInput';
import { FrequentDateButton } from './FrequentDateButton';
import { selectSelectedDate } from '../../../ducks/date/selectors';
import { selectDate } from '../../../ducks/date/actions';

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
