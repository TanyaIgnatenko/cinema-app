import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, ...props }) {
  return (
    <button type='button' {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Button;
