import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Tooltip.scss';

function Tooltip({ children, className }) {
  return <span className={classNames('tooltip', className)}>{children}</span>;
}

Tooltip.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  className: '',
};

export default Tooltip;
