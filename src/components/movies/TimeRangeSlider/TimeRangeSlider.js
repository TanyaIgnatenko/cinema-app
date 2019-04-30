import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Wireframe } from './Wireframe';
import { POSITION_UNIT } from '../../../constants';

import { Placer } from '../../../utils/Placer';

import './TimeRangeSlider.scss';

const HOUR_WIDTH = 21;

class TimeRangeSlider extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    markStep: 4,
    className: '',
  };

  static Wireframe = Wireframe;

  componentDidMount() {
    this.sliderWidth = this.calculateSliderWidth(); // NOTE: Not the same as this.slider.getBoundingClientRect().width !!
    this.SLIDER_HANDLER_HALF_WIDTH = this.startHandler.offsetWidth / 2;

    this.handlersPlacer = new Placer({
      relatedToContainer: this.slider,
      minLeft: -this.SLIDER_HANDLER_HALF_WIDTH,
      maxLeft: this.sliderWidth - this.SLIDER_HANDLER_HALF_WIDTH,
    });
    this.selectedRangePlacer = new Placer({
      relatedToContainer: this.slider,
      minLeft: 0,
      maxLeft: this.sliderWidth - this.selectedRangeLength,
    });

    this.slider.addEventListener('mousedown', this.grabObject);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRange !== this.props.selectedRange) {
      this.selectedRangePlacer.setMaxLeft(
        this.sliderWidth - this.selectedRangeLength,
      );
    }
    if (prevProps.range !== this.props.range) {
      this.sliderWidth = this.calculateSliderWidth();

      this.handlersPlacer.setMaxLeft(
        this.sliderWidth - this.SLIDER_HANDLER_HALF_WIDTH,
      );

      this.selectedRangePlacer.setMaxLeft(
        this.sliderWidth - this.selectedRangeLength,
      );
    }
  }

  componentWillUnmount() {
    this.slider.removeEventListener('mousedown', this.grabObject);
  }

  grabObject = ({ target, offsetX, offsetY }) => {
    this.grabbedObject = {
      name: target.getAttribute('name'),
      cursorShiftX: offsetX,
      cursorShiftY: offsetY,
    };

    document.addEventListener('mousemove', this.handleObjectMove);
    document.addEventListener('mouseup', this.releaseObject);
  };

  releaseObject = () => {
    this.grabbedObject = null;
    document.removeEventListener('mousemove', this.handleObjectMove);
    document.removeEventListener('mouseup', this.releaseObject);
  };

  handleObjectMove = ({ clientX: pageX, clientY: pageY }) => {
    const pagePosition = {
      left: pageX + this.grabbedObject.cursorShiftX,
      top: pageY + this.grabbedObject.cursorShiftY,
    };

    switch (this.grabbedObject.name) {
      case 'start-handler':
        this.handleStartHandlerMove(pagePosition);
        break;
      case 'end-handler':
        this.handleEndHandlerMove(pagePosition);
        break;
      case 'selected-range':
        this.handleSelectedRangeMove(pagePosition);
        break;
    }
  };

  handleStartHandlerMove = pagePosition => {
    const { selectedRange, onSelectedRangeChange } = this.props;

    const sliderPosition = this.handlersPlacer.place(pagePosition);

    const handlerCenter = sliderPosition.left + this.SLIDER_HANDLER_HALF_WIDTH;
    const newSelectedRange = {
      startHour: Math.round(this.toHour(handlerCenter)),
      endHour: selectedRange.endHour,
    };

    onSelectedRangeChange(newSelectedRange);
  };

  handleEndHandlerMove = pagePosition => {
    const { selectedRange, onSelectedRangeChange } = this.props;

    const sliderPosition = this.handlersPlacer.place(pagePosition);

    const handlerCenter = sliderPosition.left + this.SLIDER_HANDLER_HALF_WIDTH;
    const newSelectedRange = {
      startHour: selectedRange.startHour,
      endHour: Math.round(this.toHour(handlerCenter)),
    };

    onSelectedRangeChange(newSelectedRange);
  };

  handleSelectedRangeMove = pagePosition => {
    const {
      selectedRange: { startHour, endHour },
      onSelectedRangeChange,
    } = this.props;

    const sliderPosition = this.selectedRangePlacer.place(pagePosition);

    const lastStartRangePosition = this.toSliderPosition(startHour);
    const lastEndRangePosition = this.toSliderPosition(endHour);
    const moveX = sliderPosition.left - lastStartRangePosition;

    const newSelectedRange = {
      startHour: Math.round(this.toHour(lastStartRangePosition + moveX)),
      endHour: Math.round(this.toHour(lastEndRangePosition + moveX)),
    };

    onSelectedRangeChange(newSelectedRange);
  };

  toHour = sliderPosition => {
    const { range } = this.props;
    const offsetFromStartInHours = sliderPosition / HOUR_WIDTH;
    return range.startHour + offsetFromStartInHours;
  };

  toSliderPosition = hour => {
    const { range } = this.props;
    const offsetFromStartHour = hour - range.startHour;
    return offsetFromStartHour * HOUR_WIDTH;
  };

  calculateSliderWidth() {
    const { range } = this.props;
    const hoursCount = range.endHour - range.startHour;
    return hoursCount * HOUR_WIDTH;
  }

  setSliderRef = slider => (this.slider = slider);

  setStartHandlerRef = handler => (this.startHandler = handler);

  setEndHandlerRef = handler => (this.endHandler = handler);

  render() {
    const { range, selectedRange, markStep, className } = this.props;
    const startHandlerPosition = this.toSliderPosition(selectedRange.startHour);
    const endHandlerPosition = this.toSliderPosition(selectedRange.endHour);

    const selectedRangePosition = startHandlerPosition;
    this.selectedRangeLength = endHandlerPosition - startHandlerPosition;

    return (
      <div ref={this.setSliderRef} className={classNames('slider', className)}>
        <div
          name='start-handler'
          className='slider-handler'
          ref={this.setStartHandlerRef}
          style={{ left: startHandlerPosition + POSITION_UNIT }}
        />
        <div
          name='end-handler'
          className='slider-handler'
          ref={this.setEndHandlerRef}
          style={{ left: endHandlerPosition + POSITION_UNIT }}
        />
        <div
          name='selected-range'
          className='selected-range'
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

export default TimeRangeSlider;
