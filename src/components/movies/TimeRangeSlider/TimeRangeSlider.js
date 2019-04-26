import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createDragManager } from '../../../helpers/dragManager';
import { getCoords } from '../../../helpers/coordsHelpers';
import { range } from '../../../helpers/arrayHelpers';

import './TimeRangeSlider.scss';

const HOUR_WIDTH = 21;
const HOURS_IN_DAY = 24;

class TimeRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    const {
      range: { startHour, endHour },
    } = this.props;
    this.hoursRange = range(startHour, endHour);
    this.notIncludingLastHour = endHour;
    this.hoursCount = this.hoursRange.length;
  }

  componentDidMount() {
    const { selectedRange } = this.props;
    this.placeSliderHandlers(selectedRange);

    const sliderCoords = getCoords(this.slider);
    const sliderWidth = this.hoursCount * HOUR_WIDTH; // NOTE: Not the same as this.slider.getBoundingClientRect().width !!
    this.sliderHandlerWidth = this.sliderHandlerLeft.offsetWidth;

    const dragManagerConfig = {
      dragAlongX: true,
      dragObjects: [this.sliderHandlerLeft, this.sliderHandlerRight],
      dragZone: {
        left: sliderCoords.left - this.sliderHandlerWidth / 2,
        right: sliderCoords.left + sliderWidth - this.sliderHandlerWidth / 2,
      },
      positioningContainer: this.slider,
      onObjectDidDrag: this.onSliderHandlerDidDrag,
    };
    this.dragManager = createDragManager(dragManagerConfig);

    this.dragManager.start();
  }

  componentWillUnmount() {
    this.dragManager.stop();
  }

  placeSliderHandlers({ startHour, endHour }) {
    const leftSliderPosition = this.toSliderPosition(startHour);
    const rightSliderPosition = this.toSliderPosition(endHour);
    this.sliderHandlerLeft.style.left = `${leftSliderPosition}px`;
    this.sliderHandlerRight.style.left = `${rightSliderPosition}px`;
  }

  onSliderHandlerDidDrag = () => {
    const firstHandlerPosX = parseInt(this.sliderHandlerLeft.style.left, 10);
    const secondHandlerPosX = parseInt(this.sliderHandlerRight.style.left, 10);

    const startRangePosX = Math.min(firstHandlerPosX, secondHandlerPosX);
    const endRangePosX = Math.max(firstHandlerPosX, secondHandlerPosX);
    const newSelectedRange = {
      startHour: this.toHour(startRangePosX),
      endHour: this.toHour(endRangePosX),
    };

    const { onSelectedRangeChange } = this.props;
    onSelectedRangeChange(newSelectedRange);
  };

  toHour = sliderPosition => {
    const offsetFromStartHour = Math.round(
      (sliderPosition + this.sliderHandlerWidth / 2) / HOUR_WIDTH,
    );
    const { range } = this.props;
    return range.startHour + offsetFromStartHour;
  };

  toSliderPosition = hour => {
    const { range } = this.props;
    const offsetFromStartHour = hour - range.startHour;
    return offsetFromStartHour * HOUR_WIDTH;
  };

  setSliderRef = slider => (this.slider = slider);

  setSliderLeftHandlerRef = handler => (this.sliderHandlerLeft = handler);

  setSliderRightHandlerRef = handler => (this.sliderHandlerRight = handler);

  isMarkStep = step => {
    const { markStep } = this.props;
    return step % markStep === 0;
  };

  isFirstStep = step => {
    return step === 0;
  };

  isSelectedHour = hour => {
    const { selectedRange } = this.props;
    return hour >= selectedRange.startHour && hour < selectedRange.endHour;
  };

  toBeautifulTimeString = hour =>
    `${hour < HOURS_IN_DAY ? hour : hour - HOURS_IN_DAY}:00`;

  render() {
    const { className } = this.props;
    return (
      <div ref={this.setSliderRef} className={classNames('slider', className)}>
        {this.hoursRange.map((hour, step) =>
          this.isMarkStep(step) ? (
            <div className='time-interval-with-mark-box'>
              <p className='mark-label'>{this.toBeautifulTimeString(hour)}</p>
              <div
                className={classNames('time-interval with-mark', {
                  first: this.isFirstStep(step),
                  selected: this.isSelectedHour(hour),
                })}
              />
            </div>
          ) : (
            <div
              className={classNames('time-interval', {
                selected: this.isSelectedHour(hour),
              })}
            />
          ),
        )}
        <div className='time-interval-with-mark-box'>
          <p className='mark-label'>
            {this.toBeautifulTimeString(this.notIncludingLastHour)}
          </p>
          <div className={classNames('invisible-time-interval with-mark')} />
        </div>
        <div
          ref={this.setSliderLeftHandlerRef}
          className='slider-handler left'
        />
        <div
          ref={this.setSliderRightHandlerRef}
          className='slider-handler right'
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
  onSelectedRangeChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TimeRangeSlider.defaultProps = {
  markStep: 4,
  className: '',
};

export default TimeRangeSlider;
