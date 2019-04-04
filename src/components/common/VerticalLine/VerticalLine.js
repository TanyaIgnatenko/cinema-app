import React from 'react';
import PropTypes from 'prop-types';
import Line from '../Line/Line';

function VerticalLine({ length, width, ...props }) {
  return <Line height={length} width={width} {...props} />;
}

VerticalLine.propTypes = {
  length: PropTypes.number.isRequired,
  width: PropTypes.number,
};

VerticalLine.defaultProps = {
  width: 2,
};

export default VerticalLine;
