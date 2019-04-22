import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import downArrowIcon from '../../../assets/images/down-arrow.svg';

import './ToggleIcon.scss';

function ToggleIcon({ on, className, ...props }) {
  return (
    <img
      alt='toggle icon'
      className={classNames('toggleIcon', on ? 'on' : 'off', className)}
      src={downArrowIcon}
      {...props}
    />
  );
}

ToggleIcon.propTypes = {
  on: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

ToggleIcon.defaultProps = {
  className: '',
};

export default ToggleIcon;
