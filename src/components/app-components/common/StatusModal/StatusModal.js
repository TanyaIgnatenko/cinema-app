import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../base-components/Modal/Modal';
import Button from '../../../base-components/Button/Button';

import './StatusModal.scss';
import { closeModal } from '../../../../ducks/ui/modals/actions';

function StatusModal({ statusMsg, icon, closeButtonLabel, closeModal }) {
  return (
    <Modal className='status-modal' onClose={closeModal} showCloseIcon={false}>
      <div className='status-msg-box'>
        <img alt='' className='icon' src={icon} />
        <p className='status-msg'>{statusMsg}</p>
        <Button className='close-btn' onClick={closeModal}>
          {closeButtonLabel}
        </Button>
      </div>
    </Modal>
  );
}

const mapDispatchToProps = {
  closeModal,
};

StatusModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(StatusModal);
