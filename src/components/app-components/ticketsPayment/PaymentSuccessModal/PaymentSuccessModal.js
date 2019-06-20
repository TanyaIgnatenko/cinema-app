import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { closeModal } from '../../../../ducks/ui/modals/actions';

import congratIcon from '../../../../assets/images/congrat-icon.svg';

import './PaymentSuccessModal.scss';
import { Button } from '../../../base-components/Button';

function PaymentSuccessModal({ closeModal }) {
  return (
    <Modal
      className='payment-success-modal'
      onClose={closeModal}
      showCloseIcon={false}
    >
      <div className='payment-success-msg-box'>
        <img alt='' className='congrat-icon' src={congratIcon} />
        <p className='payment-success-msg'>Оплата прошла успешно!</p>
        <Button className='close-btn' onClick={closeModal}>Ок</Button>
      </div>
    </Modal>
  );
}

PaymentSuccessModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(PaymentSuccessModal);
