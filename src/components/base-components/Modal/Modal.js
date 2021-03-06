import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FocusOn } from 'react-focus-on';

import crossIcon from '../../../assets/images/dark-cross-icon.svg';

import './Modal.scss';

function Modal({ children, onClose, showCloseIcon, className }) {
  return (
    <FocusOn onEscapeKey={onClose}>
      <div className='modal-overlay' onClick={onClose} />
      <div className={classNames('modal', className)}>
        {showCloseIcon && (
          <input
            type='image'
            alt='close'
            src={crossIcon}
            tabIndex={0}
            onClick={onClose}
            className='close-icon'
            aria-label='button to close modal'
          />
        )}
        {children}
      </div>
    </FocusOn>
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
