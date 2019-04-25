import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createDragManager } from '../../../helpers/dragManager';
import { getHoursRange } from '../../../helpers/hoursHelpers';
import { getCoords } from '../../../helpers/coordsHelpers';

import './TimeRangeSlider.scss';

const HOUR_WIDTH = 21;

class TimeRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    const {
      range: { startHour, endHour },
    } = this.props;
    this.hoursRange = getHoursRange(startHour, endHour);
    this.hoursCount = this.hoursRange.length - 1;
  }

  componentDidMount() {
    const sliderCoords = getCoords(this.slider);
    const sliderWidth = this.hoursCount * HOUR_WIDTH; // NOTE: Not the same as this.slider.getBoundingClientRect().width !!
    const sliderHandlerWidth = this.sliderHandler.offsetWidth;

    const dragManagerConfig = {
      dragAlongX: true,
      dragObjectClass: '.draggable',
      dragZone: {
        left: sliderCoords.left - sliderHandlerWidth / 2,
        right: sliderCoords.left + sliderWidth - sliderHandlerWidth / 2,
      },
      positioningContainer: this.slider,
    };
    this.dragManager = createDragManager(dragManagerConfig);

    this.dragManager.start();
  }

  componentWillUnmount() {
    this.dragManager.stop();
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
