import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { Button } from '../../../base-components/Button';
import { closeModal } from '../../../../ducks/ui/modals/actions';

import sadnessIcon from '../../../../assets/images/sad-icon.svg';

import './NotAvailableAuthModal.scss';

function NotAvailableAuthModal({ closeModal }) {
  return (
    <Modal
      className='not-available-auth-modal'
      onClose={closeModal}
      showCloseIcon={false}
    >
      <div className='msg-box'>
        <img className='sadness-icon' src={sadnessIcon} />
        <p className='msg'>
          К сожалению в вашем регионе не доступна функция авторизации
        </p>
        <Button className='close-btn' onClick={closeModal}>
          Ок
        </Button>
      </div>
    </Modal>
  );
}

NotAvailableAuthModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(NotAvailableAuthModal);
