import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import arrowRight from '../../../assets/images/arrow-right.svg';

import './ButtonNext.scss';

function ButtonNext({ onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={classNames('btn', className)}
      {...props}
    >
      <img alt='button to next' className='arrowNext' src={arrowRight} />
    </button>
  );
}

ButtonNext.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ButtonNext.defaultProps = {
  onClick: () => {},
  className: '',
};

export default ButtonNext;
