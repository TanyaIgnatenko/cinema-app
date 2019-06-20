import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import crossIcon from '../../../assets/images/dark-cross-icon.svg';

import './Modal.scss';

function Modal({ children, onClose, showCloseIcon, className }) {
  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => document.body.classList.remove('modal-open');
  }, []);

  return (
    <>
      <div className='modal-overlay' onClick={onClose} />
      <div className={classNames('modal', className)}>
        {showCloseIcon && (
          <img
            alt='close'
            src={crossIcon}
            onClick={onClose}
            className='close-icon'
            aria-label='button to close modal'
          />
        )}
        {children}
      </div>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  className: PropTypes.string,
};

Modal.defaultProps = {
  isOpen: true,
  onClose: () => {},
  showCloseIcon: true,
  className: '',
};

export default Modal;
