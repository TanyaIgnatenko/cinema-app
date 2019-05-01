import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Wireframe } from './Wireframe';
import { POSITION_UNIT } from '../../../constants';

import { Placer } from '../../../utils/Placer';

import './TimeRangeSlider.scss';

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
    this.measureElementsSize();

    this.handlesPlacer = new Placer({
      relatedToContainer: this.slider,
      minLeft: -this.SLIDER_HANDLER_HALF_WIDTH,
      maxLeft: this.SLIDER_WIDTH - this.SLIDER_HANDLER_HALF_WIDTH,
    });

    this.selectedRangePlacer = new Placer({
      relatedToContainer: this.slider,
      minLeft: 0,
      maxLeft: this.SLIDER_WIDTH - this.selectedRangeLength,
    });

    this.slider.addEventListener('mousedown', this.grabObject);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRange !== this.props.selectedRange) {
      this.updateSelectedRangePlacerPositionLimitations();
    }
    if (prevProps.range !== this.props.range) {
      this.measureElementsSize();
      this.updateHandlesPlacerPositionLimitations();
      this.updateSelectedRangePlacerPositionLimitations();
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
      case 'first-handle':
        this.handleFirstHandleMove(pagePosition);
        break;
      case 'second-handle':
        this.handleSecondHandleMove(pagePosition);
        break;
      case 'selected-range':
        this.handleSelectedRangeMove(pagePosition);
        break;
    }
  };

  handleFirstHandleMove = pagePosition => {
    const { selectedRange } = this.props;

    const sliderPosition = this.handlesPlacer.place(pagePosition);

    const handleCenter = sliderPosition.left + this.SLIDER_HANDLER_HALF_WIDTH;
    const newSelectedRange = {
      startHour: Math.round(this.toHour(handleCenter)),
      endHour: !this.handlesCrossed
        ? selectedRange.endHour
        : selectedRange.startHour,
    };

    this.handleSelectedRangeChange(newSelectedRange);
  };

  handleSecondHandleMove = pagePosition => {
    const { selectedRange } = this.props;

    const sliderPosition = this.handlesPlacer.place(pagePosition);

    const handleCenter = sliderPosition.left + this.SLIDER_HANDLER_HALF_WIDTH;
    const newSelectedRange = {
      startHour: !this.handlesCrossed
        ? selectedRange.startHour
        : selectedRange.endHour,
      endHour: Math.round(this.toHour(handleCenter)),
    };

    this.handleSelectedRangeChange(newSelectedRange);
  };

  handleSelectedRangeMove = pagePosition => {
    const {
      selectedRange: { startHour, endHour },
    } = this.props;

    const sliderPosition = this.selectedRangePlacer.place(pagePosition);

    const lastStartRangePosition = this.toSliderPosition(startHour);
    const lastEndRangePosition = this.toSliderPosition(endHour);
    const moveX = sliderPosition.left - lastStartRangePosition;

    const newSelectedRange = {
      startHour: Math.round(this.toHour(lastStartRangePosition + moveX)),
      endHour: Math.round(this.toHour(lastEndRangePosition + moveX)),
    };

    this.handleSelectedRangeChange(newSelectedRange);
  };

  handleSelectedRangeChange = ({ startHour, endHour }) => {
    this.handlesCrossed = startHour > endHour;

    const selectedRange = !this.handlesCrossed
      ? {
          startHour,
          endHour,
        }
      : {
          startHour: endHour,
          endHour: startHour,
        };

    const { onSelectedRangeChange } = this.props;
    onSelectedRangeChange(selectedRange);
  };

  toHour = sliderPosition => {
    const { range } = this.props;
    const offsetFromStartInHours = sliderPosition / this.HOUR_WIDTH;
    return range.startHour + offsetFromStartInHours;
  };

  toSliderPosition = hour => {
    const { range } = this.props;
    const offsetFromStartHour = hour - range.startHour;
    return offsetFromStartHour * this.HOUR_WIDTH;
  };

  measureElementsSize() {
    this.SLIDER_WIDTH = this.slider.offsetWidth;

    const { range } = this.props;
    const hoursCount = range.endHour - range.startHour;
    this.HOUR_WIDTH = this.SLIDER_WIDTH / hoursCount;

    this.SLIDER_HANDLER_HALF_WIDTH = this.handle.offsetWidth / 2;
  }

  updateHandlesPlacerPositionLimitations() {
    this.handlesPlacer.setMinLeft(-this.SLIDER_HANDLER_HALF_WIDTH);
    this.handlesPlacer.setMaxLeft(
      this.SLIDER_WIDTH - this.SLIDER_HANDLER_HALF_WIDTH,
    );
  }

  updateSelectedRangePlacerPositionLimitations() {
    this.selectedRangePlacer.setMaxLeft(
      this.SLIDER_WIDTH - this.selectedRangeLength,
    );
  }

  setSliderRef = slider => (this.slider = slider);

  setHandleRef = handle => (this.handle = handle);

  render() {
    const { range, selectedRange, markStep, className } = this.props;

    const startHandlePosition = this.toSliderPosition(selectedRange.startHour);
    const endHandlePosition = this.toSliderPosition(selectedRange.endHour);

    const firstHandlePosition = this.handlesCrossed
      ? endHandlePosition
      : startHandlePosition;
    const secondHandlePosition = this.handlesCrossed
      ? startHandlePosition
      : endHandlePosition;

    const selectedRangePosition = startHandlePosition;
    this.selectedRangeLength = endHandlePosition - startHandlePosition;

    return (
      <div ref={this.setSliderRef} className={classNames('slider', className)}>
        <div
          name='first-handle'
          className='slider-handle'
          ref={this.setHandleRef}
          style={{ left: firstHandlePosition + POSITION_UNIT }}
        />
        <div
          name='second-handle'
          className='slider-handle'
          style={{ left: secondHandlePosition + POSITION_UNIT }}
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
