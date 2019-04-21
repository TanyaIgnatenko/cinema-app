import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ButtonPrev.scss';

import arrowRight from '../../../assets/images/arrow-right.svg';

function ButtonPrev({ onClick, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={classNames('btn', className)}
      {...props}
    >
      <img alt='button to back' className='arrowPrev' src={arrowRight} />
    </button>
  );
}

ButtonPrev.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ButtonPrev.defaultProps = {
  onClick: () => {},
  className: '',
};

export default ButtonPrev;
