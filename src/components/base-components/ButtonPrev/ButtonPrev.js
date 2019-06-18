import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import lightArrowLeft from '../../../assets/images/light-arrow-left.svg';
import darkArrowLeft from '../../../assets/images/dark-arrow-left.svg';

import './ButtonPrev.scss';

function ButtonPrev({ onClick, type, className, ...props }) {
  return (
    <button
      aria-label='button previous'
      onClick={onClick}
      className={classNames('btn', className)}
      {...props}
    >
      <img
        alt='button previous'
        className='btn-icon enhance-on-hover'
        src={type === 'light' ? lightArrowLeft : darkArrowLeft}
      />
    </button>
  );
}

ButtonPrev.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
};

ButtonPrev.defaultProps = {
  onClick: () => {},
  type: 'dark',
  className: '',
};

export default ButtonPrev;
