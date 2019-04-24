import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TimeRangeSlider.scss';

function TimeRangeSlider({ className }) {
  return (
    <div className={classNames('slider-box', className)}>
      <div className='slider-mark-labels'>
        <p className='mark-label'>10:00</p>
        <p className='mark-label'>14:00</p>
        <p className='mark-label'>18:00</p>
        <p className='mark-label'>22:00</p>
        <p className='mark-label'>02:00</p>
      </div>
      <div className='slider'>
        <span className='mark' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <span className='mark' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <span className='mark' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <span className='mark' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <div className='time-interval' />
        <span className='mark' />
        <div className='slider-handler left' />
        <div className='slider-handler right' />
      </div>
    </div>
  );
}

TimeRangeSlider.propTypes = {
  selectedRange: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};
TimeRangeSlider.defaultProps = {
  className: '',
};

export default TimeRangeSlider;
