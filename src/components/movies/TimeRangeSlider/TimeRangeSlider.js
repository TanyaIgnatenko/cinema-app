import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TimeRangeSlider.scss';

const MARK_LABEL_WIDTH = 40;

class HoursRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    const {
      range: { startHour, endHour },
      markStep,
    } = this.props;
    this.hoursRange = getHoursRange(startHour, endHour);
    this.initSliderMarks(startHour, endHour, markStep);
  }

  componentDidMount() {
    // const sliderRect = this.slider.getBoundingClientRect();
    // const sliderHandlerRect = this.handler.getBoundingClientRect();
    // this.sliderLeftBorder = sliderRect.left;
    // this.sliderLeftBorderRelativeToHandler = -sliderHandlerRect.width / 2;
    // this.sliderRightBorderRelativeToHandler =
    //   sliderRect.width + sliderHandlerRect.width / 2;
  }

  initSliderMarks = (startHour, endHour, markStep) => {
    this.hoursCount =
      endHour > startHour ? endHour - startHour : endHour + 24 - startHour;
    this.marksCount = hoursCount / markStep + 1;
    this.sliderMarks = [];
    for (
      let currentHour = startHour;
      currentHour <= endHour;
      currentHour += markStep
    ) {
      const mark = {
        label: `${currentHour}:00`,
        posX: 100 / (marksCount - 1) - MARK_LABEL_WIDTH / 2,
      };
      this.sliderMarks.push(`${currentHour}:00`);
    }
  };

  makeDraggable = event => {
    console.log('makeDraggable');
    // const draggableObject = event.currentTarget;
    this.handler.onmousedown = null;
    document.onmousemove = this.handleDrag;
    document.onmouseup = this.makeUndraggable;
  };

  handleDrag = event => {
    console.log('handleDrag');
    // const draggableObject = event.currentTarget;
    const mouseXRelativeToHandler = this.toXRelativeToHandler(event.pageX);
    const limitedX = this.limitBySliderBorders(mouseXRelativeToHandler);
    this.handler.style.left = `${limitedX}px`;
  };

  makeUndraggable = event => {
    // const draggableObject = event.currentTarget;
    console.log('makeUndraggable');
    document.onmouseup = null;
    document.onmousemove = null;
    this.handler.onmousedown = this.makeDraggable;
  };

  toXRelativeToHandler = x => x - this.sliderLeftBorder;

  limitBySliderBorders(sliderHandlerX) {
    let limitedPosX = this.limitByLeftSliderBorder(sliderHandlerX);
    limitedPosX = this.limitByRightSliderBorder(limitedPosX);
    return limitedPosX;
  }

  limitByLeftSliderBorder = sliderHandlerX =>
    Math.max(this.sliderLeftBorderRelativeToHandler, sliderHandlerX);

  limitByRightSliderBorder = sliderHandlerX =>
    Math.min(sliderHandlerX, this.sliderRightBorderRelativeToHandler);

  setSliderRef = slider => (this.slider = slider);

  setHandlerRef = handler => (this.handler = handler);

  isMarkStep = step => {
    const { markStep } = this.props;
    return step % markStep === 0;
  };

  render() {
    const { className } = this.props;
    console.log('render');

    return (
        <div
          ref={this.setSliderRef}
          className='slider'
          onMouseDown={this.makeDraggable}
        >
          {this.hoursRange.map((hour, step) =>
            this.isMarkStep(step) ? (
              <>
                <span className='mark' />
                <p className='mark-label'>{`${hour}:00`}</p>
                <div className='time-interval' />
              </>
            ) : (
              <div className='time-interval' />
            ),
          )}
          <div className='slider-handler left'/>
          <div className='slider-handler right'/>
        </div>
    );
  }
}

HoursRangeSlider.propTypes = {
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

HoursRangeSlider.defaultProps = {
  markStep: 1,
  className: '',
};

export default HoursRangeSlider;
