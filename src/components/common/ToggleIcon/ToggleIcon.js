import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import downArrowIcon from '../../../assets/images/down-arrow.svg';

function ToggleIcon({ on, ...props }) {
  return (
    <img
      alt='toggle icon'
      className={classNames(
        'toggleIcon',
        on ? 'on' : 'off',
        'ignore-react-onclickoutside',
      )}
      src={downArrowIcon}
      {...props}
    />
  );
}

ToggleIcon.propTypes = {
  on: PropTypes.bool.isRequired,
};

export default ToggleIcon;
