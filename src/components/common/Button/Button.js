import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

function Button({ children, className, ...props }) {
  return (
    <button
      type='button'
      className={classNames('button', className)}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
