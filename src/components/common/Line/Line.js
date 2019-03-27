import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Line({ width, height, className, ...props }) {
  return (
    <div
      data-testid='line'
      style={{
        width,
        height,
      }}
      className={classNames('line', className)}
      {...props}
    />
  );
}

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Line.defaultProps = {
  className: '',
};

export default Line;
