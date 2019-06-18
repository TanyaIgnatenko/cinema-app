import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import lightArrowLeft from '../../../assets/images/light-arrow-left.svg';
import darkArrowLeft from '../../../assets/images/dark-arrow-left.svg';

import './ButtonNext.scss';

function ButtonNext({ onClick, type, className, ...props }) {
  return (
    <button
      aria-label='button next'
      onClick={onClick}
      className={classNames('btn', className)}
      {...props}
    >
      <img
        alt='button next'
        className='btn-icon arrow-next enhance-on-hover'
        src={type === 'light' ? lightArrowLeft : darkArrowLeft}
      />
    </button>
  );
}

ButtonNext.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

ButtonNext.defaultProps = {
  onClick: () => {},
  type: 'dark',
  className: '',
};

export default ButtonNext;
