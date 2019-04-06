import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

function Button({ children, className, ...props }) {
  return (
    <button type='button' className={className} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: 'button',
};

export default Button;
