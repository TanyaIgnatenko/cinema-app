import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../base-components/Modal';
import { Button } from '../../../base-components/Button';
import { closeModal } from '../../../../ducks/ui/modals/actions';

import './StatusModal.scss';

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
