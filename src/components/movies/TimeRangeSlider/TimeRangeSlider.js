import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Wireframe } from './Wireframe';
import { createDragManager } from '../../../utils/DragManager';
import { POSITION_UNIT } from '../../../constants';

import './TimeRangeSlider.scss';

const HOUR_WIDTH = 21;

class TimeRangeSlider extends React.Component {
  static Wireframe = Wireframe;

  componentDidMount() {
    const { range } = this.props;
    const hoursCount = range.endHour - range.startHour;
    this.sliderWidth = hoursCount * HOUR_WIDTH; // NOTE: Not the same as this.slider.getBoundingClientRect().width !!
    this.sliderHandlerWidth = this.startHandler.offsetWidth;

    const startHandlerDragManagerConfig = {
      ignoreY: true,
      draggableObjects: [this.startHandler],
      dragOnlyZone: {
        minLeft: -this.sliderHandlerWidth / 2,
        maxLeft: this.sliderWidth - this.sliderHandlerWidth / 2,
        minTop: -Infinity,
        maxTop: Infinity,
      },
      relatedToContainer: this.slider,
      onObjectDidDrag: this.handleStartHandlerDidDrag,
    };

    const endHandlerDragManagerConfig = {
      ...startHandlerDragManagerConfig,
      draggableObjects: [this.endHandler],
      onObjectDidDrag: this.handleEndHandlerDidDrag,
    };

    const selectedRangeHandlerDragManagerConfig = {
      ...startHandlerDragManagerConfig,
      draggableObjects: [this.selectedRange],
      dragOnlyZone: {
        minLeft: 0,
        maxLeft: this.sliderWidth - this.selectedRangeLength,
        minTop: -Infinity,
        maxTop: Infinity,
      },
      onObjectDidDrag: this.handleTrackDidDrag,
    };

    this.startHandlerDragManager = createDragManager(
      startHandlerDragManagerConfig,
    );
    this.endHandlerDragManager = createDragManager(endHandlerDragManagerConfig);
    this.selectedRangeDragManager = createDragManager(selectedRangeHandlerDragManagerConfig);

    this.startHandlerDragManager.start();
    this.endHandlerDragManager.start();
    this.selectedRangeDragManager.start();
  }

  componentWillUnmount() {
    this.startHandlerDragManager.stop();
    this.endHandlerDragManager.stop();
    this.selectedRangeDragManager.stop();
  }

  handleStartHandlerDidDrag = (object, position) =>
    this.handleStartHandlerMove(position.left);

  handleStartHandlerMove = position => {
    const { selectedRange } = this.props;
    const newSelectedRange = {
      startHour: Math.round(this.toHour(position)),
      endHour: selectedRange.endHour,
    };

    const { onSelectedRangeChange } = this.props;
    onSelectedRangeChange(newSelectedRange);
  };

  handleEndHandlerDidDrag = (object, position) =>
    this.handleEndHandlerMove(position.left);

  handleEndHandlerMove = position => {
    const { selectedRange } = this.props;

    const newSelectedRange = {
      startHour: selectedRange.startHour,
      endHour: Math.round(this.toHour(position)),
    };

    const { onSelectedRangeChange } = this.props;
    onSelectedRangeChange(newSelectedRange);
  };

  handleTrackDidDrag = (object, position) =>
    this.handleTrackMove(position.left);

  handleTrackMove = position => {
    const {
      selectedRange: { startHour, endHour },
    } = this.props;

    const lastStartRangePosition = this.toSliderPosition(startHour);
    const lastEndRangePosition = this.toSliderPosition(endHour);

    const moveX = position - lastStartRangePosition;

    const newSelectedRange = {
      startHour: Math.round(this.toHour(lastStartRangePosition + moveX)),
      endHour: Math.round(this.toHour(lastEndRangePosition + moveX)),
    };

    const { onSelectedRangeChange } = this.props;
    onSelectedRangeChange(newSelectedRange);
  };

  toHour = sliderPosition => {
    const offsetFromStartInHours =
      (sliderPosition + this.sliderHandlerWidth / 2) / HOUR_WIDTH;
    const { range } = this.props;
    return range.startHour + offsetFromStartInHours;
  };

  toSliderPosition = hour => {
    const { range } = this.props;
    const offsetFromStartHour = hour - range.startHour;
    return offsetFromStartHour * HOUR_WIDTH;
  };

  setSliderRef = slider => (this.slider = slider);

  setStartHandlerRef = handler => (this.startHandler = handler);

  setEndHandlerRef = handler => (this.endHandler = handler);

  setTrackRef = handler => (this.selectedRange = handler);

  componentDidUpdate() {
    this.selectedRangeDragManager.setDragOnlyZone({
      minLeft: 0,
      maxLeft: this.sliderWidth - this.selectedRangeLength,
      minTop: -Infinity,
      maxTop: Infinity,
    });
  }

  render() {
    const { range, selectedRange, markStep, className } = this.props;
    const startHandlerPosition = this.toSliderPosition(selectedRange.startHour);
    const endHandlerPosition = this.toSliderPosition(selectedRange.endHour);

    const selectedRangePosition = startHandlerPosition;
    this.selectedRangeLength = endHandlerPosition - startHandlerPosition;

    return (
      <div ref={this.setSliderRef} className={classNames('slider', className)}>
        <div
          className='slider-handler'
          ref={this.setStartHandlerRef}
          style={{ left: startHandlerPosition + POSITION_UNIT }}
        />
        <div
          className='slider-handler'
          ref={this.setEndHandlerRef}
          style={{ left: endHandlerPosition + POSITION_UNIT }}
        />
        <div
          className='selected-range'
          ref={this.setTrackRef}
          style={{
            left: selectedRangePosition + POSITION_UNIT,
            width: this.selectedRangeLength + POSITION_UNIT,
          }}
        />
        <TimeRangeSlider.Wireframe
          markStep={markStep}
          range={range}
          selectedRange={selectedRange}
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
