import React from 'react';
import PropTypes from 'prop-types';

import { TimeRangeSlider } from '../../../../base-components/TimeRangeSlider';
import { MINUTES_IN_HOUR, toTimeLabel } from '../../../../../utils/time';

export const TIME_SLIDER_RANGE = {
  start: 10 * MINUTES_IN_HOUR,
  end: 26 * MINUTES_IN_HOUR,
};

function TimeRangeSliderWrapper({ selectedRange, selectRange, className }) {
  return (
    <TimeRangeSlider
      range={TIME_SLIDER_RANGE}
      timeUnitMinutes={60}
      selectedRange={selectedRange}
      onSelectedRangeChange={selectRange}
      formatLabel={toTimeLabel}
      className={className}
    />
  );
}

TimeRangeSliderWrapper.propTypes = {
  selectedRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  selectRange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TimeRangeSliderWrapper.defaultProps = {
  className: '',
};

export default TimeRangeSliderWrapper;
