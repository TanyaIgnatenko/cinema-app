import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getHoursRange } from '../../../helpers/hoursHelpers';

import './TimeRangeSlider.scss';

class TimeRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    const {
      range: { startHour, endHour },
    } = this.props;
    this.hoursRange = getHoursRange(startHour, endHour);
    this.hoursCount = this.hoursRange.length - 1;
  }

  setSliderRef = slider => (this.slider = slider);

  setSliderHandlerRef = handler => (this.sliderHandler = handler);

  isMarkStep = step => {
    const { markStep } = this.props;
    return step % markStep === 0;
  };

  isFirstStep = step => {
    return step === 0;
  };

  render() {
    const { className } = this.props;
    return (
      <div ref={this.setSliderRef} className={classNames('slider', className)}>
        {this.hoursRange.map((hour, step) =>
          this.isFirstStep(step) ? (
            <div className='first-mark-box'>
              <span className='first-mark' />
              <p className='first-mark-label'>{`${hour}:00`}</p>
            </div>
          ) : this.isMarkStep(step) ? (
            <div className='time-interval-with-mark-box'>
              <p className='mark-label'>{`${hour}:00`}</p>
              <div className='time-interval with-mark' />
            </div>
          ) : (
            <div className='time-interval' />
          ),
        )}
        <div
          ref={this.setSliderHandlerRef}
          onMouseDown={this.prepareToMovement}
          className='slider-handler left draggable'
        />
        <div
          onMouseDown={this.prepareToMovement}
          className='slider-handler right draggable'
        />
      </div>
    );
  }
}

TimeRangeSlider.propTypes = {
  range: PropTypes.shape({
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
  }).isRequired,
  markStep: PropTypes.number,
  selectedRange: PropTypes.shape({
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

TimeRangeSlider.defaultProps = {
  markStep: 4,
  className: '',
};

export default TimeRangeSlider;
